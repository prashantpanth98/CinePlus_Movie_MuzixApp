package com.example.MovieService.jwtfilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter
        extends GenericFilter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        ServletOutputStream pw = response.getOutputStream();
        final String authHeader = request.getHeader("Authorization");

        if(request.getMethod().equals("OPTIONS")){

            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request,response);
        }
        else if(authHeader == null || !authHeader.startsWith("Bearer "))
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            pw.println("Missing or Invalid Token");
        }
        else {

            String token = authHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey("Security Key").parseClaimsJws(token).getBody();
            String email = claims.getSubject();
           request.setAttribute("useremail",email);

            claims.getSubject();
            System.out.println(claims.getSubject());
            filterChain.doFilter(request, response);
        }

    }




}
