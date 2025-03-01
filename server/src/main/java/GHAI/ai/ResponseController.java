package GHAI.ai;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    // Get responses by condition
    @GetMapping("/condition")
    public List<Response> getResponsesByCondition(@RequestParam String condition) {
        return responseService.getResponsesByCondition(condition);
    }

    // Get responses by survey type
    @GetMapping("/surveyType")
    public List<Response> getResponsesBySurveyType(@RequestParam String surveyType) {
        return responseService.getResponsesBySurveyType(surveyType);
    }

    // Get responses by user ID and condition
    @GetMapping("/user/{userId}/condition")
    public List<Response> getResponsesByUserAndCondition(
        @PathVariable String userId,
        @RequestParam String condition
    ) {
        return responseService.getResponsesByUserAndCondition(userId, condition);
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