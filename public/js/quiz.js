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

  const triggerWheelSpin = () => {
    if (wheel) {
      const random = Math.floor(Math.random() * items.length);
      wheel.spinToItem(random, 3000, true, 2, 1);
    }
  };

  const handleSelectedAnswer = (e) => {

    if (e.target.matches('button')) {
      // MESSAGE

      if (e.target.classList.contains('correct')) {
        party.confetti(document.querySelector('main'));
      } else {
        e.target.classList.add("btn", "btn-danger");
      }


      setTimeout(() => {
        quizElement.innerHTML = '<h2>Loading…</h2>';
      }, 1000);

      setTimeout(() => {
        triggerWheelSpin();
      }, 3000);
    }
  }

  // submitButton.addEventListener('click', handleSubmit);

  quizElement.addEventListener('click', handleSelectedAnswer);

  buildWheel();
});
