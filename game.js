var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour;
var userClickedPattern = [];
var userChosenColour;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4 + 1);
  if(randomNumber === 4) randomNumber = 0;
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var buttonClicked = "#" + randomChosenColour;
  $(buttonClicked).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level ++;
  $("h1").text("Level " + level);
}

$(".btn").click(function(){
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  if(gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]){
    if(gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    wrongAnswer();
    startOver();
  }

  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function wrongAnswer(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  started = 0;
  $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = 0;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentCoulour){
  $("." + currentCoulour).addClass("pressed");
  setTimeout(function () {
    $("." + currentCoulour).removeClass("pressed");
  }, 100);
}

var started = 0;
$(document).keypress(function(){
  if(!started){
    nextSequence();
    started = 1;
  }
});
