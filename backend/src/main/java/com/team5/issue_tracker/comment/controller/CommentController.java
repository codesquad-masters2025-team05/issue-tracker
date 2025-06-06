package com.team5.issue_tracker.comment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team5.issue_tracker.comment.dto.CommentRequest;
import com.team5.issue_tracker.comment.service.CommentService;
import com.team5.issue_tracker.common.util.AuthUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private final CommentService commentService;

  @PatchMapping("/{commentId}")
  public ResponseEntity<Void> patchComment(@PathVariable Long commentId,
      @Valid @RequestBody CommentRequest updateCommentRequest, HttpServletRequest httpRequest) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    commentService.editComment(commentId, updateCommentRequest, userId);
    return ResponseEntity.noContent().build();
  }
}
