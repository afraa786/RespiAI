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
        Set<String> detectedCategories = new HashSet<>();

        for (Response response : responses) {
            Question question = questionRepository.findById(response.getQuestionId()).orElse(null);
            if (question != null && question.getCategory() != null) {
                detectedCategories.add(question.getCategory());
            }
        }

        if (detectedCategories.isEmpty()) {
            return Collections.emptyList();
        }

        return questionRepository.findByCategoryIn(new ArrayList<>(detectedCategories));
    }

    // Analyze responses to determine probable diagnosis
    public String analyzeResponses(List<Response> responses) {
        Map<String, Integer> categoryCount = new HashMap<>();

        for (Response response : responses) {
            Question question = questionRepository.findById(response.getQuestionId()).orElse(null);
            if (question != null && question.getCategory() != null) {
                categoryCount.put(question.getCategory(), categoryCount.getOrDefault(question.getCategory(), 0) + 1);
            }
        }

        return categoryCount.entrySet().stream()
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

    // Get questions by category
    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }
}