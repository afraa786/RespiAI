package GHAI.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseService {
    @Autowired
    private ResponseRepository responseRepository;

    public String saveResponses(List<Response> responses) {
        responseRepository.saveAll(responses);
        return "Responses saved successfully!";
    }

    public List<Response> getUserResponses(String userId) {
        return responseRepository.findByUserId(userId);
    }
} 
