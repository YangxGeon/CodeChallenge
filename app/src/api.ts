const BASE_URL = "https://api.coinpaprika.com/v1";

// 퀴즈들 불러오기
export async function fetchQuizzes() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
}

// 퀴즈 디테일 불러오기
export async function fetchQuizInfo(quizId: string) {
  const response = await fetch(`${BASE_URL}/coins/${quizId}`);
  const json = await response.json();
  return json;
}
