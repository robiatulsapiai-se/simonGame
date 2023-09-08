
var buttonColours = ["red","blue","green","yellow"];//array button color

var gamePattern = [];
var userClickedPattern = [];

var started=false;
var level=0;
//when first time keyboard is pressed
$(document).keydown(function(){ 
   if(!started){
    $("#level-title").text("Level  "+level);
        nextSequence();
        started = true;
   }        
});
//when button is click,  
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");//id from clicked button is keep as userchosencolor,
    userClickedPattern.push(userChosenColour);//the color is push into userclickedpattern array, 
   
    playSound(userChosenColour);//sound will produce based on userchosencolor 
    animatePress(userChosenColour);
    
    //var lastItem =userClickedPattern[userClickedPattern.length-1];
    checkAnswer(userClickedPattern.length-1);
});


//check answer function
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("sucess");
       if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
        nextSequence();
        }, 1000);
       }

    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;

}

//to set random sequence of color
function nextSequence(){

    userClickedPattern = [];


    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);//generate random number from 0-3
    var randomChosenColour = buttonColours[randomNumber];//set random color from random number
    gamePattern.push(randomChosenColour); 
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}   

//playsound based on colorchosen when user click and next sequence
function playSound(name){

    var a = new Audio("sounds/" +name+ ".mp3");
    a.play();
}

//animation when press
function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
  
}

