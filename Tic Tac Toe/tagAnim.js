// Append canvas on board 

const canvas = document.createElement('canvas');
let boxElement = document.querySelector('.box');
document.body.append(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//Styles from css file 
const tagColor = window.getComputedStyle(boxElement).color;

let ctx = canvas.getContext('2d');
ctx.clearRect(0,0,canvas.width,canvas.height);
export let runAnim = (tag,box) =>{
    if(tag ==='X'){
        animateCross(box);
    }
    else if(tag==='O'){
        animateCircle(box);
    }
    requestAnimationFrame(runAnim);
}
export let clearBoard = () =>{
    console.log('Clear board');
}

let animateCircle = (box) =>{
    let rectBox = box.getBoundingClientRect();
    let currentProgress = 0;
    let endpoint = 50; 
    
    const draw = function (currentPercentage, boxRect){
        ctx.strokeStyle = 'white';
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(boxRect.x + boxRect.width/2, boxRect.y + boxRect.height/2, 30, currentPercentage*currentProgress, endpoint, false); 
        ctx.stroke();
        currentProgress++; 
        console.log(currentProgress);
        if(currentProgress<endpoint){
            requestAnimationFrame(()=>{
                draw(currentProgress/1000, rectBox);
            });
        }
      
    }
    
    draw(currentProgress,rectBox);
    
    // Starts from left side of the box so it can draw the 
}   
 

let animateCross = (box) =>{
    console.log('cross');
}
let chalk = () =>{
    console.log('Chalk'); 
    //Create an animation which is going to imitate a chalk particles around cross/circle tag
}
