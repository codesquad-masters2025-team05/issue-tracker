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
  @NotBlank(message = "유저이름을 입력하세요")
  private String username; //TODO : 이메일로 변경?
  @NotBlank(message = "비밀번호를 입력하세요")
  private String password;
}
