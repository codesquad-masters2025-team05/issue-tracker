package com.team5.issue_tracker.common.auth;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtTokenProvider jwtTokenProvider;

  public JwtAuthFilter(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String path = request.getRequestURI();

    if (path.startsWith("/auth")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = resolveToken(request);

    if (token != null) { //TODO : 다시 확인하기
      try {
        if (jwtTokenProvider.validateToken(token)) {
          String username = jwtTokenProvider.getUsernameFromToken(token);
          Long userId = jwtTokenProvider.getUserIdFromToken(token);

          request.setAttribute("username", username);
          request.setAttribute("userId", userId);
        } else {
          response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
          return;
        }
      } catch (Exception e) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token parsing failed");
        return;
      }
    }

    filterChain.doFilter(request, response);
  }

  private String resolveToken(HttpServletRequest request) {
    String bearer = request.getHeader("Authorization");
    if (bearer != null && bearer.startsWith("Bearer ")) {
      return bearer.substring(7);
    }
    return null;
  }
}
