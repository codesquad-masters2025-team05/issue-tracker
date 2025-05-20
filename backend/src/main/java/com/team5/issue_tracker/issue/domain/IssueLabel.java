package com.team5.issue_tracker.issue.domain;

import org.springframework.data.relational.core.mapping.Table;

import lombok.Getter;

@Getter
@Table("issue_label")
public class IssueLabel {
  private Long issueId;
  private Long labelId;

  public IssueLabel(Long issueId, Long labelId) {
    this.issueId = issueId;
    this.labelId = labelId;
  }
}
