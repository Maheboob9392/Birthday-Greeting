let pages = document.querySelectorAll(".page");
let current = 0;

function nextPage(){

pages[current].classList.remove("active");
current++;

if(current < pages.length){
pages[current].classList.add("active");
}

}

let popped = 0;

function popBalloon(el){

if(!el.classList.contains("pop")){

el.classList.add("pop");
popped++;

}

if(popped === 4){

setTimeout(()=>{
nextPage();
startConfetti();
},600)

}

}


/* Confetti */

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti(){

for(let i=0;i<150;i++){

confetti.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*6+4,
speed:Math.random()*3+2
})

}

animateConfetti();

}

function animateConfetti(){

ctx.clearRect(0,0,canvas.width,canvas.height);

confetti.forEach(p=>{

ctx.fillStyle=`hsl(${Math.random()*360},70%,70%)`;
ctx.fillRect(p.x,p.y,p.size,p.size);

p.y+=p.speed;

if(p.y>canvas.height) p.y=0;

})

requestAnimationFrame(animateConfetti);

}
