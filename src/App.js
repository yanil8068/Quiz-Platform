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
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editQuiz, setEditQuiz] = useState("");
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [atLeastOneCorrectAnswerEdit, setAtLeastOneCorrectAnswerEdit] =
    useState(false);

  const user = useSelector((state) => state.usersReducer);
  console.log("current", user.currentUser);
  console.log(`checking ${user}`);

  // Save currentUser to localStorage when it changes

  // const Navigate = useNavigate();
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
  const handleDeleteQuestion = (questionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== questionIndex)
    );
  };

  const handleEditClick = (todo) => {
    setEditFormVisibility(true);
    setEditQuiz(todo);
    setQuestions(todo.questions);
  };

  const cancelUpdate = () => {
    setEditFormVisibility(false);
  };
  const [editError, setEditError] = React.useState(""); // State for title validation error message

  const editSubmit = (e) => {
    e.preventDefault();
    ////Validation for correct option
    if (!atLeastOneCorrectAnswerEdit) {
      return alert("select atleast one correct answer");
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

    setQuestions(editQuiz.questions);
    let editedObj = {
      id: editQuiz.id,
      todo: editValue,
      description: editDes,
      questions: allQuestions,
      completed: switchvalue,
      creattime: editQuiz.creattime,
      // questions: allQuestions, // Add all the questions and answer options to the todoObj
    };
    dispatch(handleEditSubmit(editedObj));
    ///2.here i was creating another quiz instead of updating it
    // const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    // const updatedQuizzes = [...existingQuizzes, editedObj];
    // localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
    /////new way trying : working fine
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
    /////new way trying end

    cancelUpdate();
  };

  const [editValue, setEditValue] = useState("");
  const [editDes, setEditDes] = useState("");
  const [switchvalue, setswitchvalue] = useState(true);

  const handleAddAnswerOptionE = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answerOptions.push({
      answer: "",
      checked: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChangeE = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerOptionChangeE = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answerOptions[answerIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  // const handleCheckboxChangeE = (questionIndex, answerIndex) => {
  //   const updatedQuestions = [...questions];
  //   updatedQuestions[questionIndex].answerOptions[answerIndex].checked =
  //     !updatedQuestions[questionIndex].answerOptions[answerIndex].checked;
  //   setQuestions(updatedQuestions);
  //   // setAtLeastOneCorrectAnswerEdit(true);
  // };

  ////
  const [editQuizplay, setEditQuizplay] = useState("");
  const [questionsplay, setQuestionsplay] = useState([]);
  const [title, setTitle] = useState("");
  console.log(editQuizplay, questionsplay);

  ///

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
                  handleAddAnswerOptionE={handleAddAnswerOptionE}
                  handleQuestionChangeE={handleQuestionChangeE}
                  handleAnswerOptionChangeE={handleAnswerOptionChangeE}
                  // handleCheckboxChangeE={handleCheckboxChangeE}
                  switchvalue={switchvalue}
                  setswitchvalue={setswitchvalue}
                  editError={editError}
                  atLeastOneCorrectAnswerEdit={atLeastOneCorrectAnswerEdit}
                  setAtLeastOneCorrectAnswerEdit={
                    setAtLeastOneCorrectAnswerEdit
                  }
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
            {/* <Route path="/quiz/:id" element={Quiz} />*/}
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
