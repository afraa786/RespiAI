package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SurveyService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ResponseRepository responseRepository;

    // Get general questions
    public List<Question> getGeneralQuestions() {
        return questionRepository.findBySurveyType("GENERAL");
    }

    // Get follow-up questions based on responses
    public List<Question> getFollowUpQuestions(List<Response> responses) {
        Set<String> detectedConditions = new HashSet<>();

        for (Response response : responses) {
            Question question = questionRepository.findById(response.getQuestionId()).orElse(null);
            if (question != null && question.getCondition() != null) {
                detectedConditions.add(question.getCondition());
            }
        }

        if (detectedConditions.isEmpty()) {
            return Collections.emptyList();
        }

        return questionRepository.findByConditionIn(new ArrayList<>(detectedConditions));
    }

    // Analyze responses to determine probable diagnosis
    public String analyzeResponses(List<Response> responses) {
        Map<String, Integer> conditionCount = new HashMap<>();

        for (Response response : responses) {
            Question question = questionRepository.findById(response.getQuestionId()).orElse(null);
            if (question != null && question.getCondition() != null) {
                conditionCount.put(question.getCondition(), conditionCount.getOrDefault(question.getCondition(), 0) + 1);
            }
        }

        return conditionCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Uncertain - More Tests Needed");
    }

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Get questions by survey type
    public List<Question> getQuestionsBySurveyType(String surveyType) {
        return questionRepository.findBySurveyType(surveyType);
    }

    // Get questions by condition
    public List<Question> getQuestionsByCondition(String condition) {
        return questionRepository.findByCondition(condition);
    }
}