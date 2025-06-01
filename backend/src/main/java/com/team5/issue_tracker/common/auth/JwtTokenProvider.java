package com.team5.issue_tracker.common.auth;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

  private final String secretKey = "mySecretKey1234567890"; // TODO : 환경변수로 분리 권장
  private final long validityInMs = 6 * 3600000; // 6시간

  public String createToken(Long userId, String username) {
    Claims claims = Jwts.claims().setSubject(username);
    claims.put("userId", userId);

    Date now = new Date();
    Date validity = new Date(now.getTime() + validityInMs);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
        .compact();
  }
}
