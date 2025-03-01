package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping("/questions")
    public List<Question> getSurveyQuestions(@RequestParam(required = false) String previousAnswers) {
        return surveyService.getAdaptiveQuestions(previousAnswers);
    }

    @PostMapping("/responses")
    public String submitResponses(@RequestBody List<Response> responses) {
        return surveyService.processResponses(responses);
    }
}
