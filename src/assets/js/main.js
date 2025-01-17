
const sound = new Howl({
    src: ['BardcoreSP.mp3'],
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