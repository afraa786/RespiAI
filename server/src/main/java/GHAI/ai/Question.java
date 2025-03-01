package GHAI.ai;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question text cannot be blank")
    private String text;

    @NotBlank(message = "Question type cannot be blank")
    private String type; // TEXT, MULTIPLE_CHOICE

    @NotBlank(message = "Survey type cannot be blank")
    private String surveyType;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options;

    @NotBlank(message = "Condition cannot be blank")
    @Column(name = "condition") // Map to the 'condition' column in the database
    private String condition; // Renamed from 'category' to match the database

    @Column(name = "question_order") // Map to the 'question_order' column in the database
    private int order; // Determines question sequence dynamically



    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSurveyType() { return surveyType; }
    public void setSurveyType(String surveyType) { this.surveyType = surveyType; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { this.options = options; }

    public String getCondition() { return condition; } // Renamed from getCategory
    public void setCondition(String condition) { this.condition = condition; } // Renamed from setCategory

    public int getOrder() { return order; }
    public void setOrder(int order) { this.order = order; }
}