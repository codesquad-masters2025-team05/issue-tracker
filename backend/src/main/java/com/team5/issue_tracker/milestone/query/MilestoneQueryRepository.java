package com.team5.issue_tracker.milestone.query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.team5.issue_tracker.milestone.dto.response.MilestoneResponse;
import com.team5.issue_tracker.milestone.dto.response.MilestoneSummaryResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MilestoneQueryRepository {

  private final NamedParameterJdbcTemplate jdbcTemplate;

  public List<MilestoneSummaryResponse> findIssueMilestones() {
    String milestoneSql = "SELECT id, name FROM milestone";
    return jdbcTemplate.query(milestoneSql,
        (rs, rowNum) -> new MilestoneSummaryResponse(rs.getLong("id"), rs.getString("name")));
  }

  public List<MilestoneResponse> findAllMilestones() {
    String sql = """
          SELECT 
            m.id,
            m.name,
            m.description,
            m.deadline,
            m.is_open,
            (
              SELECT COUNT(i.id)
              FROM issue i
              WHERE i.milestone_id = m.id AND i.is_open = true
            ) AS open_issue_count,
            (
              SELECT COUNT(i.id)
              FROM issue i
              WHERE i.milestone_id = m.id AND i.is_open = false
            ) AS closed_issue_count,
            CASE
              WHEN (
                SELECT COUNT(i.id)
                FROM issue i
                WHERE i.milestone_id = m.id
              ) = 0
              THEN 0
              ELSE ROUND(
                (
                  SELECT COUNT(i.id)
                  FROM issue i
                  WHERE i.milestone_id = m.id AND i.is_open = false
                ) * 100.0 /
                (
                  SELECT COUNT(i.id)
                  FROM issue i
                  WHERE i.milestone_id = m.id
                )
              )
            END AS progress
          FROM milestone m
          ORDER BY m.id
        """;

    return jdbcTemplate.query(sql,
        (rs, rowNum) -> new MilestoneResponse(rs.getLong("id"), rs.getString("name"),
            rs.getString("description"),
            rs.getDate("deadline") != null ? rs.getDate("deadline").toLocalDate() : null,
            rs.getBoolean("is_open"), rs.getLong("open_issue_count"),
            rs.getLong("closed_issue_count"), rs.getLong("progress")));
  }

  public long countAll() {
    return jdbcTemplate.queryForObject("SELECT COUNT(id) FROM milestone", new HashMap<>(),
        Long.class);
  }

  public long countOpen() {
    return jdbcTemplate.queryForObject("SELECT COUNT(id) FROM milestone WHERE is_open = true",
        new HashMap<>(), Long.class);
  }

  public long countClosed() {
    return jdbcTemplate.queryForObject("SELECT COUNT(id) FROM milestone WHERE is_open = false",
        new HashMap<>(), Long.class);
  }

  public Map<Long, MilestoneSummaryResponse> getMilestonesByIds(List<Long> issueIds) {
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
    if (milestoneName == null) {
      return null;
    }
    String sql = "SELECT id FROM milestone WHERE name = :milestoneName";
    MapSqlParameterSource params = new MapSqlParameterSource("milestoneName", milestoneName);
    return jdbcTemplate.queryForObject(sql, params, Long.class);
  }
}
