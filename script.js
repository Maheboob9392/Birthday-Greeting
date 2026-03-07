let pages=document.querySelectorAll(".page");

let current=0;

function nextPage(){

pages[current].classList.remove("active");

current++;

if(current<pages.length){

pages[current].classList.add("active");

}

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

/* typewriter message */

const message="A little surprise made just for you 💖";

let i=0;

function typeWriter(){

if(i<message.length){

document.getElementById("typeMessage").innerHTML+=message.charAt(i);

i++;

setTimeout(typeWriter,70);

}

}

typeWriter();

/* sparkles animation */

const canvas=document.getElementById("sparkles");

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

if(s.y>canvas.height){

s.y=0;

}

});

requestAnimationFrame(animate);

}

animate();
