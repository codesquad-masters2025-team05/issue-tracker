package com.team5.issue_tracker.issue.service;

import java.lang.reflect.Field;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.team5.issue_tracker.issue.domain.Issue;
import com.team5.issue_tracker.issue.dto.request.IssueCreateRequest;
import com.team5.issue_tracker.issue.repository.IssueRepository;
import com.team5.issue_tracker.user.service.UserService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class IssueServiceTest {

  @InjectMocks
  private IssueService issueService; // 실제로 테스트를 진행하는 객체에는 Inject를 사용

  @Mock
  private IssueRepository issueRepository;

  @Mock
  private UserService userService;

  @Test
  @DisplayName("정상 요청에 이슈가 생성되어야 한다.")
  void createIssue_success_정상_요청() {
    // given
    IssueCreateRequest request = new IssueCreateRequest(
        "hello World",
        "java",
        1L,
        List.of(1L, 2L),
        null
    );

    Long userId = 1L;

    when(issueRepository.save(any(Issue.class)))
        .thenAnswer(invocation -> {
          Issue issue = invocation.getArgument(0);

          Field idField = Issue.class.getDeclaredField("id");
          idField.setAccessible(true);
          idField.set(issue, 1L);

          return issue;
        });

    // when
    Long savedId = issueService.createIssue(request);

    // then
    assertThat(savedId).isEqualTo(1L);
    verify(issueRepository).save(any(Issue.class));
  }
}
