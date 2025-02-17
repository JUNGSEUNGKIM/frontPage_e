import axios from 'axios';
import { SampleDepressionSurvey } from "./sample"

// TEMP DEBUG - depression survey API base URL
const API_BASE_URL = 'http://121.133.205.103:3000/api';

// TEST - use sample data for each survey
const TEST = false;

const getDepressionSurvey = async (memberId: number = 1, organizationId: number = 1) => { // TODO remove default params
  if (TEST) return SampleDepressionSurvey
  try {
    const response = await axios.get(`${API_BASE_URL}/survey?survey_id=1&member_id=${memberId}&organization_id=${organizationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey:", error);
    throw error;
  }
};

const getDementiaSurvey = async (memberId: number = 1, organizationId: number = 1) => { // TODO remove default params
  try {
    const response = await axios.get(`${API_BASE_URL}/survey?survey_id=2&member_id=${memberId}&organization_id=${organizationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey:", error);
    throw error;
  }
};

const getCustomSurvey = async (surveyId: number, memberId: number = 1, organizationId: number = 1) => { // TODO remove default params
  try {
    const response = await axios.get(`${API_BASE_URL}/survey?survey_id=${surveyId}&member_id=${memberId}&organization_id=${organizationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey:", error);
    throw error;
  }
};

const postDepressionSurveyAnswer = async (answerData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/survey?survey_id=1&member_id=1&organization_id=1`, answerData);
    return response.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    throw error;
  }
};

export { getDepressionSurvey, getDementiaSurvey, getCustomSurvey };