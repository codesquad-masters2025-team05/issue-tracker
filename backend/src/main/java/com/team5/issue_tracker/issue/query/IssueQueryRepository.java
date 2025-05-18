package com.team5.issue_tracker.issue.query;

import com.team5.issue_tracker.issue.dto.IssueQueryDto;
import com.team5.issue_tracker.user.dto.UserSummaryResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class IssueQueryRepository {

  private final NamedParameterJdbcTemplate jdbcTemplate;

  public List<IssueQueryDto> findAllIssues() {
    return List.of();
  }

  public List<UserSummaryResponse> findDistinctAuthors() {
    String authorSql = """
        SELECT DISTINCT u.id, u.username, u.image_url
        FROM issue i
        JOIN user u ON i.user_id = u.id
        """;

    return jdbcTemplate.query(authorSql, (rs, rowNum) ->
        new UserSummaryResponse(
            rs.getLong("id"),
            rs.getString("username"),
            rs.getString("image_url")
        )
    );
  }
}
