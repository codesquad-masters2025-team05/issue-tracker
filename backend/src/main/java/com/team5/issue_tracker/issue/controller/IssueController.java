package com.team5.issue_tracker.issue.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.team5.issue_tracker.comment.dto.CommentRequest;
import com.team5.issue_tracker.comment.service.CommentService;
import com.team5.issue_tracker.common.dto.ApiResponse;
import com.team5.issue_tracker.common.util.AuthUtils;
import com.team5.issue_tracker.issue.dto.request.IssueDeleteRequest;
import com.team5.issue_tracker.issue.dto.request.IssueSearchRequest;
import com.team5.issue_tracker.issue.dto.request.IssueCreateRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateBulkIssueStatusRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateIssueAssigneesRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateIssueLabelsRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateIssueMilestoneRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateIssueStatusRequest;
import com.team5.issue_tracker.issue.dto.request.UpdateIssueTitleRequest;
import com.team5.issue_tracker.issue.dto.response.IssueDetailResponse;
import com.team5.issue_tracker.issue.dto.response.IssuePageResponse;
import com.team5.issue_tracker.issue.parser.IssueSearchRequestParser;
import com.team5.issue_tracker.issue.query.IssueQueryService;
import com.team5.issue_tracker.issue.service.IssueService;
import com.team5.issue_tracker.issue.dto.response.IssueLabelScrollResponse;
import com.team5.issue_tracker.label.query.LabelQueryService;
import com.team5.issue_tracker.issue.dto.response.IssueMilestoneScrollResponse;
import com.team5.issue_tracker.milestone.query.MilestoneQueryService;
import com.team5.issue_tracker.user.dto.UserScrollResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/issues")
public class IssueController {
  private final IssueService issueService;
  private final CommentService commentService;
  private final IssueQueryService issueQueryService;
  private final LabelQueryService labelQueryService;
  private final MilestoneQueryService milestonePageResponse;

  @GetMapping
  public ResponseEntity<ApiResponse<IssuePageResponse>> getPagedIssues(
      @RequestParam(required = false) String q,
      @RequestParam(required = false, defaultValue = "1") Integer page,
      @RequestParam(required = false, defaultValue = "10") Integer perPage) {
    log.info("GET /api/issues 요청");
    log.debug("q: {}", q);
    IssueSearchRequest searchRequest = IssueSearchRequestParser.fromQueryString(q);
    return ResponseEntity.ok(
        ApiResponse.success(issueQueryService.getPagedIssues(searchRequest, page, perPage)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Long>> createIssue(
      @Valid @RequestBody IssueCreateRequest issueRequest, HttpServletRequest httpRequest
  ) {
    log.info("POST /api/issues 요청");
    Long userId = AuthUtils.extractUserId(httpRequest);
    return ResponseEntity.ok(ApiResponse.success(issueService.createIssue(issueRequest, userId)));
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteIssues(
      @Valid @RequestBody IssueDeleteRequest request, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.deleteIssues(request, userId);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{issueId}")
  public ResponseEntity<ApiResponse<IssueDetailResponse>> getIssueById(@PathVariable Long issueId) {
    IssueDetailResponse response = issueQueryService.getIssueById(issueId);
    return ResponseEntity.ok(ApiResponse.success(response));
  }

  @DeleteMapping("/{issueId}")
  public ResponseEntity<Void> deleteIssue(@PathVariable Long issueId,
      HttpServletRequest httpRequest) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.deleteIssue(issueId, userId);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{issueId}/comments")
  public ResponseEntity<ApiResponse<Long>> addComment(
      @PathVariable Long issueId,
      @Valid @RequestBody CommentRequest commentRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    return ResponseEntity.ok(
        ApiResponse.success(commentService.addComment(issueId, commentRequest, userId)));
  }

  @GetMapping("/authors")
  public ResponseEntity<ApiResponse<UserScrollResponse>> getScrolledAuthors(
      @RequestParam(required = false) String cursor,
      @RequestParam(required = false, defaultValue = "10") Integer limit
  ) {
    log.info("GET /api/issues/authors 요청");
    return ResponseEntity.ok(
        ApiResponse.success(issueQueryService.getScrolledIssueAuthors(cursor, limit)));
  }

  @GetMapping("/labels")
  public ResponseEntity<ApiResponse<IssueLabelScrollResponse>> getScrolledFilterLabels(
      @RequestParam(required = false) String cursor,
      @RequestParam(required = false, defaultValue = "10") Integer limit
  ) {
    return ResponseEntity.ok(
        ApiResponse.success(labelQueryService.getScrolledFilterLabels(cursor, limit)));
  }

  @GetMapping("/milestones")
  public ResponseEntity<ApiResponse<IssueMilestoneScrollResponse>> getScrolledFilterMilestones(
      @RequestParam(required = false) String cursor,
      @RequestParam(required = false, defaultValue = "10") Integer limit
  ) {
    return ResponseEntity.ok(
        ApiResponse.success(milestonePageResponse.getScrolledFilterMilestones(cursor, limit)));
  }

  @PatchMapping("/{issueId}/title")
  public ResponseEntity<Void> updateIssueTitle(
      @PathVariable Long issueId,
      @Valid @RequestBody UpdateIssueTitleRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateIssueTitle(issueId, issueRequest, userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{issueId}/status")
  public ResponseEntity<Void> updateIssueStatus(
      @PathVariable Long issueId,
      @Valid @RequestBody UpdateIssueStatusRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateIssueStatus(issueId, issueRequest, userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{issueId}/labels")
  public ResponseEntity<Void> updateIssueLabels(
      @PathVariable Long issueId,
      @Valid @RequestBody UpdateIssueLabelsRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateIssueLabels(issueId, issueRequest, userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{issueId}/milestone")
  public ResponseEntity<Void> updateIssueMilestone(
      @PathVariable Long issueId,
      @Valid @RequestBody UpdateIssueMilestoneRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateIssueMilestone(issueId, issueRequest, userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{issueId}/assignees")
  public ResponseEntity<Void> updateIssueAssignees(
      @PathVariable Long issueId,
      @Valid @RequestBody UpdateIssueAssigneesRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateIssueAssignees(issueId, issueRequest, userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/bulk-status")
  public ResponseEntity<Void> updateBulkIssueStatus(
      @Valid @RequestBody UpdateBulkIssueStatusRequest issueRequest, HttpServletRequest httpRequest
  ) {
    Long userId = AuthUtils.extractUserId(httpRequest);
    issueService.updateBulkIssuesStatus(issueRequest, userId);
    return ResponseEntity.noContent().build();
  }
}
