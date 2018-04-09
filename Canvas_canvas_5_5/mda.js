window.onload = function () {

  var snd    =    new Audio("click.wav");

  var canvas     =    document.getElementById("myCanvas");
  var context    =    canvas.getContext("2d");

  var xcoord    =    100;    // green square        coords initialized
  var ycoord    =    100;    // green square

  var xcoordRed    =    20;    // red square          coords initialized
  var ycoordRed    =    20;    // red square

  var widthRed     =    50;    // Used to draw but also for collision checking on both squares
  var heightRed    =    50;

  var greenIncrement    =    10;

  var nModRedX    =    10;
  var nModRedY    =    10;

  var left     =    false;    // Set keys to false initially
  var right    =    false;
  var up       =    false;
  var down     =    false;

  window.addEventListener('keyup', function (key) {            //   IS
                                                               //   KEY
    if (key.which == 37) { left  = false; }                    //   UP
    if (key.which == 39) { right = false; }
    if (key.which == 38) { up    = false; }
    if (key.which == 40) { down  = false; }

  });

  window.addEventListener('keydown', function (key) {          //   IS
                                                               //   KEY
    if (key.which == 37) { left  = true; }                     //   DOWN
    if (key.which == 39) { right = true; }
    if (key.which == 38) { up    = true; }
    if (key.which == 40) { down  = true; }

  });
  //___________________________________________________________________

  function animateRed() {
    xcoordRed    +=    nModRedX;
    ycoordRed    +=    nModRedY;

    if (xcoordRed > 750) {
      nModRedX    =    -10;
    }
    if (xcoordRed < 0) {
      nModRedX    =    10;
    }
    if (ycoordRed > 750) {
      nModRedY    =    -10;
    }
    if (ycoordRed < 0) {
      nModRedY    =    10;
    }
    checkCollision();
  }

  function checkCollision() {               // For both the red and green square

    if (xcoord > (xcoordRed - widthRed) &&
      xcoord < (xcoordRed + widthRed) &&
      ycoord > (ycoordRed - heightRed) &&
      ycoord < (ycoordRed + heightRed)) {
      snd.play();
      return true;
    }
    else { return false }
  }

  function draw() {                       //   Draws the game as you press keys
    setTimeout(function () {

      if (left) {
        xcoord    =    xcoord - greenIncrement;
        if (xcoord < 0) { xcoord     =    0; }
      }
      if (up) {
        ycoord    =    ycoord - greenIncrement;
        if (ycoord < 0) { ycoord     =    0; }
      }
      if (right) {
        xcoord    =    xcoord + greenIncrement;
        if (xcoord > 750) { xcoord   =   750; }
      }
      if (down) {
        ycoord    =    ycoord + greenIncrement;
        if (ycoord > 750) { ycoord   =   750; }
      }

      requestAnimationFrame(draw);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle    =    "Red";
      context.fillRect(xcoordRed, ycoordRed, widthRed, heightRed);
      context.fillStyle    =    "Green";
      context.fillRect(xcoord, ycoord, 50, 50);         //   green square drawn
      context.stroke;
      animateRed()
    }, 1000 / 60);

  }

  draw();

}