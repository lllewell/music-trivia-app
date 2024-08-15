// 1. Configure the wheel's properties:
document.addEventListener('DOMContentLoaded', () => {
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
      },
      {
        label: 'Pop',
      },
      {
        label: 'Reggaeton',
      }
    ],
    itemBackgroundColors: ['#fff', '#eee', '#ddd'],
    itemLabelFontSizeMax: 40,
    rotationResistance: -100,
    rotationSpeedMax: 1000,
  }
  
  // 2. Decide where you want it to go:
  const container = document.querySelector('.wheel-container');
  const star = document.createElement('img');
  star.src = './treble-clef.png';
  
  // 3. Create the wheel in the container and initialise it with the props:
  const wheel = new spinWheel.Wheel(container, props);
  wheel.pointerAngle = 90;
  // wheel.overlayImage = star;
  wheel.width = "20";

  wheel.onCurrentIndexChange = e => console.log('INDEX', e);
  wheel.onRest = e => console.log('REST', e, props.items[e.currentIndex].label);
  wheel.onSpin = e => console.log('SPIN', e);

  // const winningItemIndex = 1;
  // const duration = 4000;
  // const easing = easing.cubicOut;
  // wheel.spinToItem(4, 3000, true, 2, 1);
});
