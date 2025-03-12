import React, { useState, useEffect } from 'react';
import { getGeneralQuestions, submitSurvey, getFollowUpQuestions } from '../services/SurveyService';

const SurveyComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [diagnosis, setDiagnosis] = useState('');

    useEffect(() => {
        fetchGeneralQuestions();
    }, []);

    const fetchGeneralQuestions = async () => {
        const response = await getGeneralQuestions();
        setQuestions(response.data);
    };

    const handleSubmit = async () => {
        const response = await submitSurvey(responses);
        setDiagnosis(response.data);
    };

    const handleResponseChange = (questionId, answer) => {
        setResponses([...responses, { questionId, answer }]);
    };

    return (
        <div>
            <h1>Survey</h1>
            {questions.map((question) => (
                <div key={question.id}>
                    <label>{question.text}</label>
                    <input
                        type="text"
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {diagnosis && <p>Diagnosis: {diagnosis}</p>}
        </div>
    );
};

export default SurveyComponent;