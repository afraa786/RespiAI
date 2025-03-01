package GHAI.ai;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class OptionRepository {

public interface OptionRepo extends JpaRepository<Option, Long> {
    List<Option> findByQuestionId(Long questionId); // Find options by question ID
}
}
