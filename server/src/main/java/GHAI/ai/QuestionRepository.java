package GHAI.ai;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySurveyType(String surveyType);
    List<Question> findByCondition(String condition); // Updated from findByCategory
    List<Question> findByConditionIn(List<String> conditions); // Updated from findByCategoryIn
}