package com.team5.issue_tracker.issue.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueCreateRequest {

  @NotBlank(message = "제목을 작성해주세요.")
  private String title;

  @NotBlank(message = "본문을 작성해주세요.")
  private String body;
  private Long assigneeId;
  private List<Long> labelIds;
  private Long milestoneId;
}
