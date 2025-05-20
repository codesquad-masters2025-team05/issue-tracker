package com.team5.issue_tracker.issue.domain;

import java.time.LocalDateTime;

import lombok.Getter;

import org.springframework.data.annotation.Id;

@Getter
public class Issue {
  @Id
  private Long id;

  private String title;
  private String body;
  private Long milestoneId;
  private boolean isOpen;

  private final Long userId;
  private final LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public Issue(String title, String body, Long userId, Long milestoneId, boolean isOpen) {
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.milestoneId = milestoneId;
    this.isOpen = isOpen;
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public void update(String title, String body, Long milestoneId, boolean isOpen) {
    this.title = title;
    this.body = body;
    this.milestoneId = milestoneId;
    this.isOpen = isOpen;
    this.updatedAt = LocalDateTime.now();
  }
}
