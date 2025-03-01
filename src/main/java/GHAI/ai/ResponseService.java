package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    // Save responses
    public String saveResponses(List<Response> responses) {
        responseRepository.saveAll(responses);
        return "Responses saved successfully!";
    }

    // Get responses by user ID
    public List<Response> getUserResponses(String userId) {
        return responseRepository.findByUserId(userId);
    }

    // Get all responses
    public List<Response> getAllResponses() {
        return responseRepository.findAll();
    }

    // Get responses by question ID
    public List<Response> getResponsesByQuestionId(Long questionId) {
        return responseRepository.findByQuestionId(questionId);
    }

    // Get responses by category
    public List<Response> getResponsesByCategory(String category) {
        List<Question> questions = questionRepository.findByCategory(category);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByQuestionIdIn(questionIds);
    }

    // Get responses by survey type
    public List<Response> getResponsesBySurveyType(String surveyType) {
        List<Question> questions = questionRepository.findBySurveyType(surveyType);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByQuestionIdIn(questionIds);
    }

    // Get responses by user ID and category
    public List<Response> getResponsesByUserAndCategory(String userId, String category) {
        List<Question> questions = questionRepository.findByCategory(category);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByUserIdAndQuestionIdIn(userId, questionIds);
    }

    // Get responses by user ID and survey type
    public List<Response> getResponsesByUserAndSurveyType(String userId, String surveyType) {
        List<Question> questions = questionRepository.findBySurveyType(surveyType);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByUserIdAndQuestionIdIn(userId, questionIds);
    }
}