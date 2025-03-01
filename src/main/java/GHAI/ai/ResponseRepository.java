package GHAI.ai;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;
    
    import java.util.List;
    
    @Repository
    public interface ResponseRepository extends JpaRepository<Response, Long> {
        List<Response> findByUserId(String userId); // Fetch responses by user ID
    }

