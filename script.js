let pages=document.querySelectorAll(".page");

let current=0;

function nextPage(){

pages[current].classList.remove("active");

current++;

pages[current].classList.add("active");

}

/* gift open */

function openGift(){

let gift=document.querySelector(".giftBox");

gift.classList.add("open");

setTimeout(()=>{

nextPage();

},800)

}

/* balloon pop */

let popped=0;

function popBalloon(balloon,word){

if(balloon.classList.contains("pop")) return;

document.getElementById("popSound").play();

balloon.classList.add("pop");

document.getElementById(word).classList.add("show");

popped++;

if(popped===4){

setTimeout(()=>{

nextPage();

},1200)

}

}

/* typewriter */

const text="I made a little surprise for you 💖";

let i=0;

function typeWriter(){

if(i<text.length){

document.getElementById("typeText").innerHTML+=text.charAt(i);

i++;

setTimeout(typeWriter,60);

}

}

typeWriter();

/* sparkles */

const canvas=document.getElementById("sparkleCanvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

for(let i=0;i<100;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.5

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

stars.forEach(s=>{

ctx.beginPath();
ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
ctx.fill();

s.y+=s.speed;

if(s.y>canvas.height) s.y=0;

});

requestAnimationFrame(animate);

}

animate();