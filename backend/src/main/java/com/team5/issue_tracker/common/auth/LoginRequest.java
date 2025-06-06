package com.team5.issue_tracker.common.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
  @NotBlank(message = "이메일을 입력하세요")
  private String email;
  @NotBlank(message = "비밀번호를 입력하세요")
  private String password;
}
