package com.team5.issue_tracker.common.auth;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;


@Component
public class JwtTokenProvider {
  private final String base64Secret = "F9c0FlcLC_NSSXm3EFy2q7zZphkBNoHcer0PrcAe3AQ_"; //TODO : 테스트용 임시 키 수정
  private final Key key = Keys.hmacShaKeyFor(java.util.Base64.getUrlDecoder().decode(base64Secret));
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
        .signWith(SignatureAlgorithm.HS256, key)
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }

  public Long getUserIdFromToken(String token) {
    return parseClaims(token).get("userId", Long.class);
  }

  public String getUsernameFromToken(String token) {
    return parseClaims(token).getSubject();
  }

  private Claims parseClaims(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(token).getBody();
  }
}
