import {
  ADD_QUIZ,
  REMOVE_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUESTION,
  TOGGLE_QUIZ_COMPLETED,
  SET_USER,
} from "../actions";

const initialStat = {
  currentUser: null,
};

export const usersReducer = (state = initialStat, actio) => {
  switch (actio.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: actio.payload,
      };
    default:
      return state;
  }
};

const initialState = [
  {
    id: 1,
    todo: "Buy Laptop",
    completed: true,
    description: "Need to buy a new laptop for work.",
    creattime: "1/4/2024 3:35: PM",
    questions: [
      {
        question: "Which brand are you considering?",
        answerOptions: [
          { answer: "Brand A", checked: true },
          { answer: "Brand B", checked: false },
          { answer: "Brand C", checked: false },
        ],
      },
      {
        question: "What is your budget range?",
        answerOptions: [
          { answer: "Under $500", checked: false },
          { answer: "$500 - $1000", checked: true },
          { answer: "Over $1000", checked: false },
        ],
      },
      {
        question: "Why is your something?",
        answerOptions: [
          { answer: "Under $50", checked: false },
          { answer: "$500 - $100", checked: false },
          { answer: "Over $100", checked: true },
        ],
      },
      {
        question: " is your something?",
        answerOptions: [
          { answer: "Under $50", checked: false },
          { answer: "$500 - $100", checked: false },
          { answer: "Over $100", checked: true },
        ],
      },
      {
        question: "your is your something?",
        answerOptions: [
          { answer: "Under $50", checked: false },
          { answer: "$500 - $100", checked: false },
          { answer: "Over $100", checked: true },
        ],
      },
      {
        question: "something is your something?",
        answerOptions: [
          { answer: "Under $50", checked: false },
          { answer: "$500 - $100", checked: false },
          { answer: "Over $100", checked: true },
        ],
      },
    ],
  },
  {
    id: 2,
    todo: "Master Redux",
    completed: false,
    description: "Learn Redux for state management.",
    creattime: "1/4/2024 3:35: PM",
    questions: [
      {
        question: "What is Redux?",
        answerOptions: [
          {
            answer: "A state management library for JavaScript applications.",
            checked: true,
          },
          { answer: "A database management system.", checked: false },
          { answer: "A programming language.", checked: false },
        ],
      },
      {
        question: "What is your budget range?",
        answerOptions: [
          { answer: "Under $500", checked: false },
          { answer: "$500 - $1000", checked: true },
          { answer: "Over $1000", checked: false },
        ],
      },
    ],
  },
  {
    id: 3,
    todo: "Watering here",
    completed: true,
    description: "Water the plants in the garden.",
    creattime: "1/4/2024 3:35: PM",
    questions: [
      {
        question: "How often do you water the plants?",
        answerOptions: [
          { answer: "Once a day", checked: false },
          { answer: "Twice a day", checked: false },
          { answer: "Every other day", checked: true },
        ],
      },
    ],
  },
];

export const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_QUIZ_COMPLETED:
      return state.map((quiz) =>
        quiz.id === action.payload
          ? { ...quiz, completed: !quiz.completed }
          : quiz
      );
    case ADD_QUIZ:
      return [...state, action.payload];
    case REMOVE_QUIZ:
      const filteredQuizs = state.filter((quiz) => quiz.id !== action.payload);
      return filteredQuizs;
    case UPDATE_QUIZ:
      console.log(action.payload);
      return state.map((quiz) =>
        quiz.id === action.payload.id ? action.payload : quiz
      );
    case DELETE_QUESTION:
      return state.map((quiz) => {
        const updatedQuestions = quiz.questions.filter(
          (_, index) => index !== action.payload.questionIndex
        );
        return { ...quiz, questions: updatedQuestions };
      });
    default:
      return state;
  }
};
