package com.team5.issue_tracker.milestone.query;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.team5.issue_tracker.milestone.dto.response.MilestoneCountResponse;
import com.team5.issue_tracker.milestone.dto.response.MilestoneResponse;
import com.team5.issue_tracker.milestone.dto.response.MilestoneSummaryResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MilestoneQueryRepository {

  private final NamedParameterJdbcTemplate jdbcTemplate;

  public List<MilestoneSummaryResponse> findIssueMilestones(String cursor, Integer limit) {
    String milestoneSql = """
    SELECT id, name FROM milestone
    WHERE (:cursor IS NULL OR name > :cursor)
    ORDER BY name ASC
    LIMIT :limitPlusOne;
    """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("cursor", cursor);
    params.addValue("limitPlusOne", limit + 1);

    return jdbcTemplate.query(milestoneSql, params,
        (rs, rowNum) -> new MilestoneSummaryResponse(rs.getLong("id"), rs.getString("name")));
  }

  public MilestoneResponse getMilestoneById(Long milestoneId) {
    String sql = """
        WITH issue_counts AS (
          SELECT
            milestone_id,
            COUNT(id) AS total,
            SUM(CASE WHEN is_open = true THEN 1 ELSE 0 END) AS open_count,
            SUM(CASE WHEN is_open = false THEN 1 ELSE 0 END) AS closed_count
          FROM issue
          WHERE milestone_id = :milestoneId
          GROUP BY milestone_id
        )
        SELECT
          m.id,
          m.name,
          m.description,
          m.deadline,
          m.is_open,
          COALESCE(ic.open_count, 0) AS open_issue_count,
          COALESCE(ic.closed_count, 0) AS closed_issue_count,
          CASE
            WHEN COALESCE(ic.total, 0) = 0 THEN 0
            ELSE ROUND((ic.closed_count) * 100.0 / ic.total)
          END AS progress
        FROM milestone m
        LEFT JOIN issue_counts ic ON m.id = ic.milestone_id
        WHERE m.id = :milestoneId
        LIMIT 1
        """;

    MapSqlParameterSource params = new MapSqlParameterSource("milestoneId", milestoneId);

    List<MilestoneResponse> result = jdbcTemplate.query(sql, params, (rs, rowNum) ->
        new MilestoneResponse(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getObject("deadline", LocalDate.class),
            rs.getBoolean("is_open"),
            rs.getLong("open_issue_count"),
            rs.getLong("closed_issue_count"),
            rs.getLong("progress")
        )
    );

    return result.stream().findFirst().orElse(null);
  }

  public List<MilestoneResponse> findMilestones(Integer page, Integer perPage) {
    String sql = """
          WITH paged_milestones AS (
            SELECT id, name, description, deadline, is_open
            FROM milestone
            ORDER BY name
            LIMIT :limit OFFSET :offset
          ),
          issue_counts AS (
            SELECT
              milestone_id,
              COUNT(id) AS total,
              SUM(CASE WHEN is_open = true THEN 1 ELSE 0 END) AS open_count,
              SUM(CASE WHEN is_open = false THEN 1 ELSE 0 END) AS closed_count
            FROM issue
            WHERE milestone_id IN (SELECT id FROM paged_milestones)
            GROUP BY milestone_id
          )
          SELECT
            m.id,
            m.name,
            m.description,
            m.deadline, 
            m.is_open,
            COALESCE(ic.open_count, 0) AS open_issue_count,
            COALESCE(ic.closed_count, 0) AS closed_issue_count,
            CASE
              WHEN COALESCE(ic.total, 0) = 0 THEN 0
              ELSE ROUND((ic.closed_count) * 100.0 / ic.total)
            END AS progress
          FROM paged_milestones m
          LEFT JOIN issue_counts ic ON m.id = ic.milestone_id
          ORDER BY m.name
        """;
    MapSqlParameterSource params = new MapSqlParameterSource();

    int limit = perPage;
    int offset = (page - 1) * perPage;
    params.addValue("limit", limit);
    params.addValue("offset", offset);

    return jdbcTemplate.query(sql, params,
        (rs, rowNum) -> new MilestoneResponse(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getDate("deadline") != null ? rs.getDate("deadline").toLocalDate() : null,
            rs.getBoolean("is_open"),
            rs.getLong("open_issue_count"),
            rs.getLong("closed_issue_count"),
            rs.getLong("progress")));
  }

  public MilestoneCountResponse countMilestones() {
    String sql = """
        SELECT
          COUNT(id) AS total,
          SUM(CASE WHEN is_open = true THEN 1 ELSE 0 END) AS open_count,
          SUM(CASE WHEN is_open = false THEN 1 ELSE 0 END) AS closed_count
        FROM milestone
        """;

    return jdbcTemplate.queryForObject(sql, new HashMap<>(), (rs, rowNum) ->
        new MilestoneCountResponse(
            rs.getLong("total"),
            rs.getLong("open_count"),
            rs.getLong("closed_count")
        )
    );
  }

  public Map<Long, MilestoneSummaryResponse> getMilestonesByIds(List<Long> issueIds) {
    if (issueIds == null || issueIds.isEmpty()) {
      return Collections.emptyMap(); // 빈 결과 반환
    }

    String milestoneSql = """
        SELECT 
            i.id AS issue_id,
            m.id AS milestone_id,
            m.name AS milestone_name
        FROM issue i
        JOIN milestone m ON i.milestone_id = m.id
        WHERE i.id IN (:issueIds)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource("issueIds", issueIds);

    List<Map<String, Object>> rows = jdbcTemplate.queryForList(milestoneSql, params);

    return rows.stream().collect(Collectors.toMap(row -> ((Number) row.get("issue_id")).longValue(),
        row -> new MilestoneSummaryResponse(((Number) row.get("milestone_id")).longValue(),
            (String) row.get("milestone_name"))));
  }

  public Long getMilestoneIdByName(String milestoneName) {
    String sql = "SELECT id FROM milestone WHERE name = :milestoneName";
    MapSqlParameterSource params = new MapSqlParameterSource("milestoneName", milestoneName);
    List<Long> result = jdbcTemplate.queryForList(sql, params, Long.class);

    return result.isEmpty() ? -1L : result.get(0);
  }

  public Long getMilestoneCount() {
    String sql = "SELECT COUNT(id) FROM milestone";
    return jdbcTemplate.queryForObject(sql, Collections.emptyMap(), Long.class);
  }
}
