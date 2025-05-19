package com.team5.issue_tracker.milestone.query;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import com.team5.issue_tracker.milestone.dto.MilestoneResponse;

@Repository
public class MilestoneQueryRepository {
  public Map<Long, MilestoneResponse> getMilestonesByIds(List<Long> issueIds) {
    return Map.of();
  }
}
