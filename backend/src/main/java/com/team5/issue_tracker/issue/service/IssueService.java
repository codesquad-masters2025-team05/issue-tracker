package com.team5.issue_tracker.issue.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team5.issue_tracker.issue.domain.Issue;
import com.team5.issue_tracker.issue.dto.request.IssueCreateRequest;
import com.team5.issue_tracker.issue.repository.IssueRepository;
import com.team5.issue_tracker.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueService {
  private final IssueRepository issueRepository;
  private final UserService userService;

  @Transactional
  public Long createIssue(IssueCreateRequest request) {
    Long userId = 1L; // TODO: 유저가 없으니 우선 임시데이터 넣음!
    if (!userService.existsById(userId)) {
      throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
    } //TODO: 커스텀 에러 만들지 고민중
    Issue issue = new Issue(
        request.getTitle(),
        request.getBody(),
        userId,
        request.getMilestoneId(),
        true
    );
    Issue savedIssue = issueRepository.save(issue);

    return savedIssue.getId();
  }
}
