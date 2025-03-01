package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/responses")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    // Submit responses
    @PostMapping("/submit")
    public String submitResponses(@RequestBody List<Response> responses) {
        return responseService.saveResponses(responses);
    }

    // Get responses by user ID
    @GetMapping("/user/{userId}")
    public List<Response> getUserResponses(@PathVariable String userId) {
        return responseService.getUserResponses(userId);
    }

    // Get all responses
    @GetMapping("/all")
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    // Get responses by question ID
    @GetMapping("/question/{questionId}")
    public List<Response> getResponsesByQuestionId(@PathVariable Long questionId) {
        return responseService.getResponsesByQuestionId(questionId);
    }

    // Get responses by category
    @GetMapping("/category")
    public List<Response> getResponsesByCategory(@RequestParam String category) {
        return responseService.getResponsesByCategory(category);
    }

    // Get responses by survey type
    @GetMapping("/surveyType")
    public List<Response> getResponsesBySurveyType(@RequestParam String surveyType) {
        return responseService.getResponsesBySurveyType(surveyType);
    }

    // Get responses by user ID and category
    @GetMapping("/user/{userId}/category")
    public List<Response> getResponsesByUserAndCategory(
        @PathVariable String userId,
        @RequestParam String category
    ) {
        return responseService.getResponsesByUserAndCategory(userId, category);
    }

    // Get responses by user ID and survey type
    @GetMapping("/user/{userId}/surveyType")
    public List<Response> getResponsesByUserAndSurveyType(
        @PathVariable String userId,
        @RequestParam String surveyType
    ) {
        return responseService.getResponsesByUserAndSurveyType(userId, surveyType);
    }
}