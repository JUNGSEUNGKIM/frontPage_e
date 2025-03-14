import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import depressionSurveyPHQ9 from "@/assets/data/depressionSurveyPHQ9.json";
import depressionSurveyCESD from "@/assets/data/depressionSurveyCESD.json";
import depressionSurveyGDS from "@/assets/data/depressionSurveyGDS.json";
import dementiaSurvey from "@/assets/data/dementiaSurvey.json";

// TEMP DEBUG - depression survey API base URL
const API_BASE_URL = "https://api.emmaet.com/api";

// TEST - use sample data for each survey
const TEST = true;

const getSurvey = async (
    surveyId: number,
    memberId: number,
    organizationId: number
) => {
    if (TEST) {
        switch (surveyId) {
            case 1: return depressionSurveyPHQ9;
            case 2: return dementiaSurvey;
            case 3: return depressionSurveyCESD;
            case 4: return depressionSurveyGDS;
            default: return depressionSurveyCESD;
        }
    }
    try {
        const response = await axios.get(
            `${API_BASE_URL}/survey?survey_id=${surveyId}&member_id=${memberId}&organization_id=${organizationId}`
        );
        console.log(`Survey data successfully fetched.`);
        return response.data;
    } catch (error) {
        console.error(`Error while fetching survey):`, error);
        throw error;
    }
};

const postSurveyAnswer = async (
    answerData: any,
    surveyId: number,
    memberId: number,
    organizationId: number
) => {
    try {
        const response = await axios.post(
            answerData,
            `${API_BASE_URL}/survey?survey_id=${surveyId}&member_id=${memberId}&organization_id=${organizationId}`
        );
        console.log(`Survey answer data sucessfully posted.`);
        return response.data;
    } catch (error) {
        console.error(`Error while posting survey answer:`, error);
        throw error;
    }
};

const useSurveyGet = (
    surveyId: number,
    memberId: number,
    organizationId: number
) => {
    return useQuery({
        queryKey: ["surveyGet", surveyId, memberId, organizationId],
        queryFn: () => getSurvey(surveyId, memberId, organizationId),
    });
};

const useCESDDepressionSurveyGet = (
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    return useSurveyGet(3, memberId, organizationId);
};

const useGDSDepressionSurveyGet = (
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    return useSurveyGet(4, memberId, organizationId);
};

const useDementiaSurveyGet = (
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    return useSurveyGet(2, memberId, organizationId);
};

const useSurveyAnswerPost = (
    answerData: any,
    surveyId: number,
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    const queryClient = useQueryClient();
    const key = ["surveyPost", surveyId, memberId, organizationId];
    return useMutation({
        mutationKey: key,
        mutationFn: () =>
            postSurveyAnswer(answerData, surveyId, memberId, organizationId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
    });
};

const useDepressionSurveyAnswerPost = (
    answerData: any,
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    return useSurveyAnswerPost(answerData, 1, memberId, organizationId);
};

const useDementiaSurveyAnswerPost = (
    answerData: any,
    memberId: number = 1,
    organizationId: number = 1
) => {
    // TODO remove default params
    return useSurveyAnswerPost(answerData, 2, memberId, organizationId);
};

export {
    useSurveyGet,
    useCESDDepressionSurveyGet,
    useGDSDepressionSurveyGet,
    useDementiaSurveyGet,
    useSurveyAnswerPost,
    useDepressionSurveyAnswerPost,
    useDementiaSurveyAnswerPost,
};
