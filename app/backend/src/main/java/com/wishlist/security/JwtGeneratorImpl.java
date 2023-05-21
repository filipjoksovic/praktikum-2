package com.wishlist.security;

import com.wishlist.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.logging.Logger;

@Service
public class JwtGeneratorImpl implements IJWTGenerator {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${expiration}")
    private long jwtExpiration;
    @Value("${refresh.token.expiration}")
    private long refreshExpiration;
    @Value("${app.jwttoken.message}")
    private String message;

    Logger logger = Logger.getLogger(JwtGeneratorImpl.class.getName());

    public JwtGeneratorImpl() {

    }

    @Override
    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public Map<String, String> generateToken(User user) {
        String token = buildToken(user, jwtExpiration);
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        return tokenMap;
    }

    @Override
    public String buildToken(User user, long expiration) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    @Override
    public Map<String, String> generateRefreshToken(User user) {
        String token = buildToken(user, refreshExpiration);
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("refreshToken", token);
        return tokenMap;
    }

    @Override
    public String extractEmail(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            return claims.getSubject();
        } catch (JwtException e) {
            // Handle the exception if the token is invalid or has expired
            throw new JwtException("Invalid token");
        }
    }

    @Override
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();
            return expirationDate.before(currentDate);
        } catch (JwtException e) {
            return true;
        }
    }

    @Override
    public boolean isTokenValid(String token, User user) {
        final String email = extractEmail(token);
        return (email.equals(user.getEmail())) && !isTokenExpired(token);
    }

}
