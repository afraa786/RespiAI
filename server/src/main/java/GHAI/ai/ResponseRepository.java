package GHAI.ai;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findByUserId(String userId);
    List<Response> findByQuestionId(Long questionId);
    List<Response> findByQuestionIdIn(List<Long> questionIds);
    List<Response> findByUserIdAndQuestionIdIn(String userId, List<Long> questionIds);
}