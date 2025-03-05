import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dementiaSurvey from "@/assets/data/dementiaSurvey.json";
import { HealthSurveyResult } from "@/shared/types/healthSurveyResult";
import SampleMemberData from "@/assets/data/sampleMemberData.json";

// TEMP DEBUG - depression survey API base URL
const API_BASE_URL = "https://api.emmaet.com/api";

// TEST - use sample data
const TEST = false;

const getMemberData = async (
    memberId: number,
) => {
    if (TEST) return SampleMemberData;
    try {
        const response = await axios.get(
            `${API_BASE_URL}/member/${memberId}`
        );
        console.log(`Member data successfully fetched.`);
        return response.data;
    } catch (error) {
        console.error(`Error while fetching member data):`, error);
        throw error;
    }
};

const useMemberDataGet = (
    memberId: number = 1,
) => {
    return useQuery({
        queryKey: ["memberGet", memberId],
        queryFn: () => getMemberData(memberId),
    });
};

const postHealthSurveyAnswer = async (
    answerData: HealthSurveyResult,
) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/member/basic-info`,
            {
                "member_id": answerData.member_id,
                "gender": answerData.gender,
                "age": answerData.age,
                "height": answerData.height,
                "weight": answerData.weight,
                "regular_exercise": answerData.regular_exercise,
                "exercise_frequency": answerData.exercise_frequency,
                "sleep_hours": answerData.sleep_hours,
                "sleep_quality": answerData.sleep_quality,
                "stress_level": answerData.stress_level,
                "emotional_state": answerData.emotional_state,
                "existing_conditions": answerData.existing_conditions,
                "medication": answerData.medication
            }
        );
        console.log(`Health survey answer data sucessfully posted.`);
        return response.data;
    } catch (error) {
        console.error(`Error while posting health survey answer:`, error);
        throw error;
    }
};

interface HealthSurveyPostResponse {
    success: boolean;
    message: string;
}

const useHealthSurveyAnswerPost = () => {
    const queryClient = useQueryClient();
  
    return useMutation<HealthSurveyPostResponse, Error, { answerData: HealthSurveyResult; memberId: number }>({
        mutationFn: async ({ answerData }) => {
            return await postHealthSurveyAnswer(answerData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["healthSurveyPost"] });
        },
        onError: (error) => {
            console.error('Error posting health survey answers:', error);
        },
    });
};

export {
    useMemberDataGet,
    useHealthSurveyAnswerPost,
};
