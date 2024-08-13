import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.1/dist/spin-wheel-esm.js';

// 1. Configure the wheel's properties:
const props = {
    items: [
      {
        label: 'Hip-Hop',
      },
      {
        label: 'Rock',
      },
      {
        label: 'R&B',
      },
      {
        label: 'Country',
      }
      {
        label: 'Pop',
      }
      {
        label: 'Reggaton',
      }
    ]
  }
  
  // 2. Decide where you want it to go:
  const container = document.querySelector('.wheel-container');
  
  // 3. Create the wheel in the container and initialise it with the props:
  const wheel = new Wheel(container, props);

  const winningItemIndex = await fetchWinningItemIndex();
  const duration = 4000;
  const easing = easing.cubicOut;
  wheel.spinToItem(winningItemIndex, duration, true, 2, 1, easing) 