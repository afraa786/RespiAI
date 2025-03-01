package GHAI.ai;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply to all "/api/" endpoints
                        .allowedOrigins("http://localhost:3000") // Update port
                        .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH")
                        .allowedHeaders("*");
            }
        };
    }
} 
