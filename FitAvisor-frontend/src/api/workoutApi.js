import axios from "axios";

const API_URL = 'http://localhost:8080/workouts';

export const submitWorkoutData = async (formData) => {
  try {
    const res = await axios.get(API_URL, formData);
    console.log("✅ API 요청 성공:", res.data);
    return res.data; // 성공 시 받은 데이터 반환
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    throw error; // 실패 시 에러를 던져서 호출한 곳에서 처리하게 함
  }
};  