
const sound = new Howl({
    src: ['BardcoreSP.wav'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend: function() {
      console.log('Finished!');
    }
  });




// function init() {
//     loadSound();
// }

// init()

// window.addEventListener('load', () => {
//     init();
// });