package com.team5.issue_tracker.label.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabelPageResponse {
  private Integer total;
  private Integer page;
  private Integer perPage;
  private List<LabelResponse> labels;
}
