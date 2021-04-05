var pattern=[];
var array=["red","blue","green","yellow"];
var userPattern = [];
var started=false;
var level=0;
$(document).keypress(function(){

    if(!started)
    {
        $("#level-title").text("Level " + level);
        next();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length-1);
});
function next()
{
    userPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var r=Math.floor(Math.random()*4);
    var colour=array[r];
    pattern.push(colour);
    $("#"+colour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(colour);
    animatePress(colour);
}
function playsound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(colour){
    
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    },100);
}

function checkAnswer(level)
{
    if(pattern[level]===userPattern[level])
    {
        console.log("success");
        if(userPattern.length===pattern.length)
        {
            setTimeout(function(){
                next();
            },1000);
        }
        
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over,Press any key to Restart");
            startOver();
    }
    
}

function startOver()
{
    level=0;
    started =false;
    pattern=[];
}