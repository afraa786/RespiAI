import axios from 'axios';

const API_URL = 'http://localhost:8080/survey'; // Adjust the URL based on your backend

export const getGeneralQuestions = () => {
    return axios.get(`${API_URL}/questions/general`);
};

export const getFollowUpQuestions = (responses) => {
    return axios.post(`${API_URL}/questions/followup`, responses);
};

export const submitSurvey = (responses) => {
    return axios.post(`${API_URL}/submit`, responses);
};

export const getAllQuestions = () => {
    return axios.get(`${API_URL}/questions/all`);
};

export const getQuestionsBySurveyType = (surveyType) => {
    return axios.get(`${API_URL}/questions`, { params: { surveyType } });
};

export const getQuestionsByCondition = (condition) => {
    return axios.get(`${API_URL}/questions/condition`, { params: { condition } });
};