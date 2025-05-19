package com.team5.issue_tracker.label.query;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import com.team5.issue_tracker.label.dto.LabelResponse;

@Repository
public class LabelQueryRepository {
  public Map<Long,List<LabelResponse>> getLabelListByIssueIds(List<Long> issueIds) {
    return Map.of();
  }
}
