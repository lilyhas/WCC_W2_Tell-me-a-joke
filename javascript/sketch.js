/*

Lili Chasioti
WCC_W2 - Tell me a Joke 

A sketch that uses an open API for jokes, to display jokes on the press of a button. 
Understanding DOM elements and integrating APIs

*/

let canvas;
let button;
let slider;

let displayState = 0;

let jokeFact;
let loading = true;
let img;

let sz;

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  rectMode(CENTER);
  // perform request
  fetch("https://official-joke-api.appspot.com/random_joke").then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log("Got a joke");
    console.log(data);

    jokeFact = data;
    loading = false;

  }).catch(function (err) {
    console.log(`Something went wrong: ${err}`);
  });


  addGUI();
}

function draw() {

  textAlign(LEFT);
  background(250);

  fill(0);

  if (loading) {
    // loading screen
    //  textSize(30);
    textWrap(WORD);
    text("Loading...", 0, height / 2 - 25, width, 50);

  } else if (displayState == 0) {
    textSize(width * 0.1);
    textStyle(ITALIC);

    text(jokeFact.setup, width / 2 + 10, height / 5, width);



  } else {
    fill(40);
    textSize(width * 0.1);
    textStyle(BOLD);

    text(jokeFact.punchline, width / 2 + 10, height / 3, width);

  }

}

function addGUI() {


  //add a button
  if (displayState == 0) {
    button = createButton("Make me laugh");
  } else if (displayState == 1) {
    button = createButton("Tell me a joke");

  }

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");

  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress);

}

function handleButtonPress() {

  if (displayState < 1) {
    displayState++;
  } else {
    displayState = 0;
  }

  if (displayState == 0) {
    button.html("Make me laugh");
    window.location.reload()
  } else if (displayState == 1) {
    button.html("Tell me a joke");
    ;
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}