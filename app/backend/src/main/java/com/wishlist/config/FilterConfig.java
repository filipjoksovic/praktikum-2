package com.wishlist.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    private final JwtFilter jwtFilter;

    public FilterConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

//    @Bean
//    public FilterRegistrationBean jwtFilterBean() {  // Renamed the method here
//        FilterRegistrationBean filter = new FilterRegistrationBean();
//        filter.setFilter(jwtFilter);
//        filter.addUrlPatterns("/api/users", "/api/family", "/api/shoppingLists");
//        return filter;
//    }
}

