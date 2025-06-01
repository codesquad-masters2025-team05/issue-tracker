package com.team5.issue_tracker.common.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.team5.issue_tracker.common.dto.ApiResponse;
import com.team5.issue_tracker.common.exception.ErrorCode;
import com.team5.issue_tracker.common.exception.NotFoundException;
import com.team5.issue_tracker.user.domain.User;
import com.team5.issue_tracker.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
    // 사용자 검증
    User user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

    if (!request.getPassword().equals(user.getPassword())) {
      throw new RuntimeException("비밀번호가 일치하지 않습니다."); //TODO : 예외 처리 개선 필요
    }

    String token = jwtTokenProvider.createToken(user.getId(), user.getUsername());

    return ResponseEntity.ok(ApiResponse.success(new LoginResponse(token)));
  }
}
