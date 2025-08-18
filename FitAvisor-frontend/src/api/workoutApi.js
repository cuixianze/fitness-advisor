import axios from "axios";

/**
 * 운동 데이터를 서버에 제출하는 함수
 * @param {object} formData - 제출할 폼 데이터
 */
export const submitWorkoutData = async (formData) => {
  try {
    const res = await axios.post('http://localhost:8080/workouts', formData);
    console.log("✅ API 요청 성공:", res.data);
    return res.data; // 성공 시 받은 데이터 반환
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    throw error; // 실패 시 에러를 던져서 호출한 곳에서 처리하게 함
  }
};  