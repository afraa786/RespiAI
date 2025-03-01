package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private QuestionRepository questionRepository;

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

    // Get responses by condition
    public List<Response> getResponsesByCondition(String condition) {
        List<Question> questions = questionRepository.findByCondition(condition);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByQuestionIdIn(questionIds);
    }

    // Get responses by survey type
    public List<Response> getResponsesBySurveyType(String surveyType) {
        List<Question> questions = questionRepository.findBySurveyType(surveyType);
        List<Long> questionIds = questions.stream().map(Question::getId).toList();
        return responseRepository.findByQuestionIdIn(questionIds);
    }

    // Get responses by user ID and condition
    public List<Response> getResponsesByUserAndCondition(String userId, String condition) {
        List<Question> questions = questionRepository.findByCondition(condition);
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