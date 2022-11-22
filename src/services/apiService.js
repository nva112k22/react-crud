import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.post("api/v1/participant", data);
}

const getAllUsers = () => {
    return axios.get("api/v1/participant/all");
}

const putUpdateUser = (id,username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", {data: {id:userId}});
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (userEmail, userPassword) => {
  return axios.post(`api/v1/login`, 
  { 
    email: userEmail, 
    password: userPassword,
    delay: 2000
  });
};
// const postLogin1 = (email, password) => {
//   return axios.post(`api/v1/login`, {
//     email, password
//     { email: userEmail, password: userPassword }
//   });
// };
const postRegister = (userEmail, userPassword, userName) => {
  return axios.post(`/api/v1/register`, {
    email: userEmail,
    password: userPassword,
    username: userName
  });
};
const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
}
const logOut = (email, refresh_token) => {
  return axios.post("/api/v1/logout", {
    email,
    refresh_token,
  });
}
const getDataQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, {...data});
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`/api/v1/quiz/all`);
}

const putUpdateQuiz = (id, description, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put("/api/v1/quiz", data);
};

const deleteQuizs = (id) => {
  return axios.delete(`/api/v1/quiz/${id}`);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, image,) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append('questionImage', image);
    return axios.post("/api/v1/question", data);
}

const postCreateNewQuestionForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("/api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post('api/v1/quiz-assign-to-user', {
    quizId, userId
  });
}
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, {...data});
}
const getOverview = () => {
  return axios.get(`api/v1/overview`);
}
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUsers,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  logOut,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuizs,
  postCreateNewQuestionForQuiz,
  postCreateNewQuestionForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  getOverview,
};