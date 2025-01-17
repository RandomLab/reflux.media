document.getElementById('sonClick').addEventListener('click', function() {
    const sound = new Howl({
        src: ['/assets/js/BardcoreSP.mp3'],
        loop: true,
        volume: 0.8,
    });
    sound.once('load', function(){
        sound.play();
    });
});

// function init() {
//     loadSound();
// }

// init()

// window.addEventListener('load', () => {
//     init();
// });