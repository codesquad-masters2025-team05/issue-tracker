package com.team5.issue_tracker.issue.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team5.issue_tracker.issue.domain.Issue;
import com.team5.issue_tracker.issue.dto.request.IssueCreateRequest;
import com.team5.issue_tracker.issue.repository.IssueRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueService {
  private final IssueRepository issueRepository;

  @Transactional
  public Long createIssue(IssueCreateRequest request) {
    Long userId = 1L; // TODO: 유저가 없으니 우선 임시데이터 넣음!
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
