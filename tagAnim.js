// Append canvas on board 
const canvas = document.createElement('canvas');
let boxElement = document.querySelector('.box');
let board = document.querySelector('.board');
board.append(canvas);
//Styles from css file 
const tagColor = window.getComputedStyle(boxElement).color;
let ctx = canvas.getContext('2d');
canvas.width = board.getBoundingClientRect().width;
canvas.height = board.getBoundingClientRect().height;

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
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = tagColor;
    ctx.strokeStyle = 'tagColor';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(box.x, box.y, 5, 0, Math.PI*2);
    ctx.stroke();
    
}
let animateCross = (box) =>{
    let boxRect = box.getBoundingClientRect();
    
    ctx.fillRect(boxRect.x, boxRect.y, boxRect.width, boxRect.height);
    ctx.stroke();
}
//take Position X from clicked box 
//take Position Y from clicked box
// Tomorrow ..  
