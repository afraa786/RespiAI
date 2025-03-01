package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class SurveyService {
    private static final Logger logger = LoggerFactory.getLogger(SurveyService.class);

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ResponseRepository responseRepository;

    public List<Question> getAllQuestions() {
        logger.info("Fetching all questions");
        return questionRepository.findAll();
    }

    public void saveResponses(List<Response> responses) {
        if (responses == null || responses.isEmpty()) {
            logger.warn("Attempted to save empty or null responses");
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }

        logger.info("Saving {} responses", responses.size());
        responseRepository.saveAll(responses);
    }
}
