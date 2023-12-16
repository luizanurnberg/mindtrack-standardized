import org.springframework.web.servlet.config.annotation.CorsRegistry;

public class CorsConfigFacade {

    public static void configureCors(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
