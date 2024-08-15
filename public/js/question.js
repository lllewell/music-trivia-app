// const quizData = [
//     {
//         question: "What year was hip hop created?",
//         options: [1973, 1992, 1986, 2000],
//         answer: 1973,
//         genre: "Hip hop"
//     },
//     {
//         question: "This popular rock group shares its name with what flower?",
//         options: ["Guns & Roses", "Guns & Hydrangeas", "Guns & Daises", "Guns & Tulips"],
//         answer: "Guns & Roses",
//         genre: "Rock"
//     },
//     {
//         question: "What does R&B stand for?",
//         options: ["Rhythm & Blues", "Rock & Banjo", "Roger & Bobby"],
//         answer: "Rhythm & Blues",
//         genre: "R&B"
//     },
//     {
//         question: "Who is Dolly Parton's god-daughter?",
//         options: ["Miley Cyrus", "Gwen Stefani", "Christina Aguilera", "Kelly Clarkson"],
//         answer: "Miley Cyrus",
//         genre: "Country"
//     },
//     {
//         question: "Who is the king of pop?",
//         options: ["Michael Jackson", "Elvis Presley", "Justin Bieber", "Willie Nelson"],
//         answer: "Michael Jackson",
//         genre: "Pop"
//     },
//     {
//         question: "What is this popular artist's, Ramón Ayala, stage name ",
//         options: ["Daddy Yankee", "Bad Bunny", "Rauw Alejandro"],
//         answer: "Daddy Yankee",
//         genre: "Reggaeton"
//     }
// ];

const getQuestion = async (event) => {
  event.preventDefault();

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit");


    const response = await fetch("/api/questions/:genre", {
      method: "GET",
      body: JSON.stringify({ genre }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to get questions");
    }

  
  
  let currentQuestion = 0;
  let score = 0;
  
  function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
  
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      optionsElement.appendChild(button);
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
  
    if (selectedButton.innerText === answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quiz.innerHTML = `
      <h1>Quiz Completed!</h1>
      <p>Your score: ${score}/${quizData.length}</p>
    `;
  }
};
  showQuestion();