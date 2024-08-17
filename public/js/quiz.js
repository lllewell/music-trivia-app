document.addEventListener('DOMContentLoaded', () => {
  const quizElement = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const items = [
    {
      label: 'Hip-Hop',
      id: 'hip-hop',
    },
    {
      label: 'Rock',
      id: 'rock',
    },
    {
      label: 'R&B',
      id: 'r-b',
    },
    {
      label: 'Country',
      id: 'country',
    },
    {
      label: 'Pop',
      id: 'pop',
    },
    {
      label: 'Reggaeton',
      id: 'reggaeton',
    }
  ];

  let wheel;
  let currentQuestion = 0;
  let score = 0;

  const setupWheel = () => {
    return {
      items: items,
      itemBackgroundColors: ['#fff', '#eee', '#ddd'],
      itemLabelFontSizeMax: 40,
      rotationResistance: -100,
      rotationSpeedMax: 1000,
    }
  }

  const getQuestion = async (genre) => {
    const response = await fetch(`/api/questions/genre/` + genre, {
      method: "GET",
      headers: { "Accept": "text/html" },
    });

    const data = await response.text();

    console.log('HTML', data);

    return data;
  };


  const handleSpin = async (e, items) => {
    const genre = items[e.currentIndex].id;
    quizElement.innerHTML = await getQuestion(genre);
  };

  // function showQuestion() {
  //   const question = quizData[currentQuestion];
  //   questionElement.innerText = question.question;

  //   optionsElement.innerHTML = "";
  //   question.options.forEach(option => {
  //     const button = document.createElement("button");
  //     button.innerText = option;
  //     optionsElement.appendChild(button);
  //     button.addEventListener("click", selectAnswer);
  //   });
  // }

  // function selectAnswer(e) {
  //   const selectedButton = e.target;
  //   const answer = quizData[currentQuestion].answer;

  //   if (selectedButton.innerText === answer) {
  //     score++;
  //   }

  //   currentQuestion++;

  //   if (currentQuestion < quizData.length) {
  //     showQuestion();
  //   } else {
  //     showResult();
  //   }
  // }

  // function showResult() {
  //   quiz.innerHTML = `
  //     <h1>Quiz Completed!</h1>
  //     <p>Your score: ${score}/${quizData.length}</p>
  //   `;
  // }

  const buildWheel = () => {
    // 2. Decide where you want it to go:
    const container = document.querySelector('.wheel-container');
    const star = document.createElement('img');
    star.src = './treble-clef.png';

    const props = setupWheel();

    console.log('PROPS', props);

    // 3. Create the wheel in the container and initialise it with the props:
    wheel = new spinWheel.Wheel(container, props);

    wheel.pointerAngle = 90;
    // wheel.overlayImage = star;
    wheel.width = "20";

    wheel.onCurrentIndexChange = (e) => console.log('INDEX', e);
    wheel.onRest = (e) => handleSpin(e, props.items);
    wheel.onSpin = (e) => console.log('SPIN', e);

    // const winningItemIndex = 1;
    // const duration = 4000;
    // const easing = easing.cubicOut;
    // wheel.spinToItem(4, 3000, true, 2, 1);
    console.log('BUILT');
  }
  
  const handleSubmit = () => {
    if (wheel) {
      const random = Math.floor(Math.random() * items.length);
      wheel.spinToItem(random, 3000, true, 2, 1);
    }
  };

  const handleSelectedAnswer = (e) => {
    if (e.target.matches('button')) {
      console.log('SELECTED');
      wheel.spinToItem(random, 3000, true, 2, 1);
      // ALL JS GOES HERE FOR QUIZ ADVANCEMENT
    }
  }
  
  submitButton.addEventListener('click', handleSubmit);

  quizElement.addEventListener('click', handleSelectedAnswer);

  buildWheel();
});
