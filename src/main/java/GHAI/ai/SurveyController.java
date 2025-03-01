package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/survey")
public class SurveyController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SurveyService surveyService;

    // Fetch survey questions based on symptoms
    @GetMapping("/questions")
    public List<Question> getSurveyQuestions(@RequestParam(required = false) boolean breathingIssue) {
        if (breathingIssue) {
            return questionRepository.findByType("BREATHING_SURVEY");
        } else {
            return questionRepository.findByType("GENERAL_GBS_SURVEY");
        }
    }

    // Save user responses
    @PostMapping("/responses")
    public String submitResponses(@RequestBody List<Response> responses) {
        surveyService.saveResponses(responses);
        return "Responses saved successfully!";
    }
}
