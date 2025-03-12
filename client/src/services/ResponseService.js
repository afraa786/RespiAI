import axios from 'axios';

const API_URL = 'http://localhost:8080/responses'; // Adjust the URL based on your backend

export const submitResponses = (responses) => {
    return axios.post(`${API_URL}/submit`, responses);
};

export const getUserResponses = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`);
};

export const getAllResponses = () => {
    return axios.get(`${API_URL}/all`);
};

export const getResponsesByQuestionId = (questionId) => {
    return axios.get(`${API_URL}/question/${questionId}`);
};

export const getResponsesByCondition = (condition) => {
    return axios.get(`${API_URL}/condition`, { params: { condition } });
};

export const getResponsesBySurveyType = (surveyType) => {
    return axios.get(`${API_URL}/surveyType`, { params: { surveyType } });
};

export const getResponsesByUserAndCondition = (userId, condition) => {
    return axios.get(`${API_URL}/user/${userId}/condition`, { params: { condition } });
};

export const getResponsesByUserAndSurveyType = (userId, surveyType) => {
    return axios.get(`${API_URL}/user/${userId}/surveyType`, { params: { surveyType } });
};