
var nums = [];
var started = true;
var clickcount = 0;
var aud = new Audio('sounds/wrong.mp3');
aud.play();
$(document).keypress(function()
{  
    $(document).unbind("keypress");
    $(".btn").click(function(){
        console.log(this.id +" " + clickcount);
        buttonAnimation(this.id);
        nextMove(this.id);
    });
    level(1);
})



function level(i)
{   
    clickcount = 0;
    $("#level-title").html("Level " + i);
    var vroom = randomNum();
    
    setTimeout(function(){
        buttonAnimation(convert(vroom));
    },1000);
    nums.push(vroom);
    console.log(nums);
}

function nextMove(j)
{   
        
    if(clickcount > nums.length || convert(nums[clickcount])!==j)
    {   
        nums = [];
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        gameOver();

        clickcount = 0;
        return;
    }
    if(clickcount==nums.length-1)
        {   
            level(nums.length+1); 
             return;
        } 
    clickcount++;
    
    
}

function gameOver()
{   
    nums = [];
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    if(started)
    {
        restart();
        started = false;
    }    
}


function randomNum()
{   
    return Math.floor(Math.random() * 4);
}

function convert(a)
{
    if(a===0)
        return "green";
    if(a===1)
        return "red";
    if(a===2)
        return "yellow";
    if(a===3)
        return "blue";
    else
        return "red";
}

function buttonAnimation(currentKey)
{
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    var audio = new Audio('sounds/' + currentKey + '.mp3');
    audio.play();
    console.log("exists");
    setTimeout(function(){
    activeButton.classList.remove("pressed");
    },50);
}

function restart() {
    $("#level-title").html("press any key to continue");
    console.log("wtf");
    $(document).keypress(function()
    {   
        nums = [];
        $(document).unbind("keypress");
        started = true;
        level(1);
    });
}