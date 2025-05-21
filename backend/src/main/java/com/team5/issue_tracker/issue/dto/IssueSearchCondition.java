package com.team5.issue_tracker.issue.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IssueSearchCondition {
  private Boolean isOpen;
  private Long assigneeId;
  private Set<Long> labelId;
  private Long milestoneId;
  private Long authorId;
}
