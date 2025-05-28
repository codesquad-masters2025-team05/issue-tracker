package com.team5.issue_tracker.milestone.service;

import org.springframework.stereotype.Service;

import com.team5.issue_tracker.milestone.domain.Milestone;
import com.team5.issue_tracker.milestone.dto.request.MilestoneCreateRequest;
import com.team5.issue_tracker.milestone.repository.MilestoneRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MilestoneService {
  private final MilestoneRepository milestoneRepository;

  public Long createMilestone(MilestoneCreateRequest request) {
    Milestone milestone = new Milestone(
        request.getName(),
        request.getDeadline(),
        request.getDescription(),
        true
    );

    Milestone savedMilestone = milestoneRepository.save(milestone);
    return savedMilestone.getId();
  }
}
