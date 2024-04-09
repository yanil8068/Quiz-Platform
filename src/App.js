import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import MyQuiz from "./components/MyQuiz";
import { useDispatch } from "react-redux";
import { handleEditSubmit } from "./redux/todoapp/actions";
import PlayQuizHome from "./components/PlayQuizHome";
import PlayQuiz from "./components/PlayQuiz";
import Result from "./components/Result";
import LoginPage from "./components/LoginPage";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [editFormVisibility, setEditFormVisibility] = useState(false); // state to make form visible or hide
  const [editQuiz, setEditQuiz] = useState(""); //state to editQuiz
  const [questions, setQuestions] = useState([]); //state for questions array
  const [name, setName] = useState(""); //state for name when we play quiz
  const [score, setScore] = useState(0); // state to keep track of score when we play quiz
  const [atLeastOneCorrectAnswerEdit, setAtLeastOneCorrectAnswerEdit] =
    useState(false); //to track if correct answer is selected or not
  const [errInEdit, setErrInEdit] = useState(false); //error in edit form for not adding more than 4 answer options
  const [editError, setEditError] = React.useState(""); //error in edit form
  const [editValue, setEditValue] = useState(""); // title in edit form
  const [editDes, setEditDes] = useState(""); // description in edit form
  const [switchvalue, setswitchvalue] = useState(true); // to make quiz active or inactive
  const [editQuizplay, setEditQuizplay] = useState(""); // to hold particular quiz in playQuizHome
  const [questionsplay, setQuestionsplay] = useState([]); // questions array for playquizhome
  const [title, setTitle] = useState(""); //title of quiz
  const user = useSelector((state) => state.usersReducer); // getting user
  //console.log(editQuizplay, questionsplay);
  // console.log("current", user.currentUser);
  // console.log(`checking ${user}`);

  // Create an array to store all the questions
  const allQuestions = questions.map((question) => {
    //questions = [[answerOptions],[answerOptions],[answerOptions]]
    // Create an array to store all the answer options
    const answerOptions = question.answerOptions.map((option) => ({
      //questions.answerOptions = [[[answer],[checked]],[answer],[checked],[answer],[checked]]
      answer: option.answer, //questions.answerOptions.answer
      checked: option.checked, //questions.answerOptions.checked
    }));

    return {
      question: question.question,
      answerOptions: answerOptions,
    };
  });

  //when we click on edit in MyQuiz
  const handleEditClick = (todo) => {
    //empty the previous errInEdit
    setErrInEdit("");
    //to open the edit form
    setEditFormVisibility(true);
    //setting particular quiz as EditQuiz
    setEditQuiz(todo);
    //setting questions of particular quiz
    setQuestions(todo.questions);
  };

  //called when we delete a question in edit form
  const handleDeleteQuestion = (questionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== questionIndex)
    );
  };
  // when click on x in edit form
  const cancelUpdate = () => {
    //empty the previous errors
    setErrInEdit("");
    setEditError("");

    setEditFormVisibility(false);
  };

  //when update is clicked in edit form
  const editSubmit = (e) => {
    e.preventDefault();
    setEditError("");
    //Validation for correct option
    if (!atLeastOneCorrectAnswerEdit) {
      return setEditError("select atleast one correct answer");
    }

    // Validation logic for title
    if (editValue.length < 10 || editValue.length > 30) {
      setEditError("Title must be between 10 and 30 characters long.");
      return; // Stop execution if validation fails
    } else {
      setEditError(""); // Clear error message if title is valid
    }

    // Validation logic for description
    if (editDes.length < 10 || editDes.length > 300) {
      setEditError("Description must be between 10 and 300 characters long.");
      return;
    }

    // Validation logic for questions
    const questionErrors = questions.map((question, index) => {
      if (question.question.length < 10 || question.question.length > 200) {
        return `Question ${
          index + 1
        } must be between 10 and 200 characters long.`;
      }
      if (question.answerOptions.length < 2) {
        return `Question ${index + 1} must have at least two options.`;
      }

      if (
        question.answerOptions.some((option) => option.answer.trim() === "")
      ) {
        return `All answer options for question ${index + 1} cannot be empty.`;
      }

      return "";
    });

    if (questionErrors.some((error) => error !== "")) {
      setEditError(questionErrors);
      return;
    }

    // Reset edit error state if validation passes
    setEditError("");

    //setting updated questions
    setQuestions(editQuiz.questions);

    let editedObj = {
      //id will be same
      id: editQuiz.id,
      todo: editValue,
      description: editDes,
      questions: allQuestions,
      completed: switchvalue,
      creattime: editQuiz.creattime,
    };
    //updating question in redux store
    dispatch(handleEditSubmit(editedObj));

    //
    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quizIndex = existingQuizzes.findIndex(
      (quiz) => quiz.id === editedObj.id
    );

    if (quizIndex !== -1) {
      // If the quiz exists in local storage, update it
      existingQuizzes[quizIndex] = editedObj;
      localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));
    } else {
      // If the quiz doesn't exist in local storage, add it
      const updatedQuizzes = [...existingQuizzes, editedObj];
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
    }
    //

    cancelUpdate();
  };

  //when we start editing particular question in edit form
  const handleQuestionChangeE = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  //when we start editing an answer option , i.e . we start writing in the textfield of the answer option that already have the answer option text
  const handleAnswerOptionChangeE = (questionIndex, answerIndex, value) => {
    //using spread operator passing all questions
    const updatedQuestions = [...questions];
    //updating that particular answer option
    updatedQuestions[questionIndex].answerOptions[answerIndex].answer = value;
    //setting questions to updated questions
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    setEditValue(editQuiz.todo);
    setEditDes(editQuiz.description);
    setswitchvalue(editQuiz.completed);
  }, [editQuiz]);

  return (
    <>
      {user.currentUser ? (
        <BrowserRouter>
          <Header />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Home />} />

            {/* <Route path="/login" element={<LoginPage />} /> */}

            <Route
              path="/new"
              element={<CreateQuiz editFormVisibility={editFormVisibility} />}
            />
            <Route
              path="/quizzes"
              element={
                <MyQuiz
                  handleDeleteQuestion={handleDeleteQuestion}
                  handleEditClick={handleEditClick}
                  editFormVisibility={editFormVisibility}
                  setEditFormVisibility={setEditFormVisibility}
                  cancelUpdate={cancelUpdate}
                  editSubmit={editSubmit}
                  editValue={editValue}
                  setEditValue={setEditValue}
                  editDes={editDes}
                  setEditDes={setEditDes}
                  questions={questions}
                  setQuestions={setQuestions}
                  handleQuestionChangeE={handleQuestionChangeE}
                  handleAnswerOptionChangeE={handleAnswerOptionChangeE}
                  switchvalue={switchvalue}
                  setswitchvalue={setswitchvalue}
                  editError={editError}
                  atLeastOneCorrectAnswerEdit={atLeastOneCorrectAnswerEdit}
                  setAtLeastOneCorrectAnswerEdit={
                    setAtLeastOneCorrectAnswerEdit
                  }
                  errInEdit={errInEdit}
                  setErrInEdit={setErrInEdit}
                />
              }
            />
            <Route
              path="/PlayQuizHome"
              element={
                <PlayQuizHome
                  name={name}
                  setName={setName}
                  editQuizplay={editQuizplay}
                  setEditQuizplay={setEditQuizplay}
                  questionsplay={questionsplay}
                  setQuestionsplay={setQuestionsplay}
                  setTitle={setTitle}
                />
              }
            />
            <Route
              path="/Quiz"
              element={
                <PlayQuiz
                  name={name}
                  score={score}
                  setScore={setScore}
                  questionsplay={questionsplay}
                  setQuestionsplay={setQuestionsplay}
                  title={title}
                />
              }
            />

            <Route
              path="/result"
              element={
                <Result
                  score={score}
                  TotalQuestion={questionsplay.length}
                  setName={setName}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
