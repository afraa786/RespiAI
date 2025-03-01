package GHAI.ai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurveyService {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ResponseRepository responseRepository;

    // public List<Question> getAllQuestions() {
    //     return questionRepository.findAll();
    // }

    public void saveResponses(List<Response> responses) {
        responseRepository.saveAll(responses);
    }
}
