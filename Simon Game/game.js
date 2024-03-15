const buttonColors = ["red","blue","green","yellow"];
var sequence = [];
var userPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level 0");
        newSequence();
        started = true;
    }
})

$(".btn").on("click" , function(){
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    // console.log(userPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length-1);
})

function newSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
   var randNum =  Math.floor(Math.random()*4);
   var chosenColor = buttonColors[randNum];
   sequence.push(chosenColor);
   $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(chosenColor);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (sequence[currentLevel] === userPattern[currentLevel]){
        console.log("Success");
        if(sequence.length == userPattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }
    else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("GAME OVER (press any key to restart)");
        restart();
    }
}

function restart(){
    sequence = [];
    level = 0;
    started = false;
}