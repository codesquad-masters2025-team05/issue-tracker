package com.team5.issue_tracker.issue.domain;

import java.time.Instant;

import lombok.Getter;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;

@Getter
public class Issue {
  @Id
  private Long id;

  private String title;
  private Long milestoneId;
  private Boolean isOpen;

  private final Long userId;
  //todo: 글로벌 서비스를 위한 자료형 변경
  private final Instant createdAt;
  private Instant updatedAt;

  public Issue(String title, Long userId, Long milestoneId, Boolean isOpen, Instant createdAt, Instant updatedAt) {
    this.title = title;
    this.userId = userId;
    this.milestoneId = milestoneId;
    this.isOpen = isOpen;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PersistenceConstructor
  public Issue(Long id, String title, Long userId, Long milestoneId, Boolean isOpen, Instant createdAt, Instant updatedAt) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.milestoneId = milestoneId;
    this.isOpen = isOpen;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public void update(String title, Long milestoneId, Boolean isOpen) {
    this.title = title;
    this.milestoneId = milestoneId;
    this.isOpen = isOpen;
    this.updatedAt = Instant.now();
  }
}
