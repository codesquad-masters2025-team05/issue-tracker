package com.team5.issue_tracker.common.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
  private String username; //TODO : 이메일로 변경?
  private String password;
}
