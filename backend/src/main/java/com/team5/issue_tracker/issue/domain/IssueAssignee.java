package com.team5.issue_tracker.issue.domain;

import org.springframework.data.relational.core.mapping.Table;

import lombok.Getter;

@Getter
@Table("issue_label")
public class IssueAssignee {
  private Long issueId;
  private Long assigneeId;

  public IssueAssignee(Long issueId, Long assigneeId) {
    this.issueId = issueId;
    this.assigneeId = assigneeId;
  }
}
