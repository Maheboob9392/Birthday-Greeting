// Balloon Generator

const balloonContainer = document.querySelector(".balloons");

function createBalloon(){

const balloon = document.createElement("div");
balloon.classList.add("balloon");

balloon.style.left = Math.random()*100 + "vw";
balloon.style.background = `hsl(${Math.random()*360},70%,60%)`;
balloon.style.animationDuration = (5 + Math.random()*5) + "s";

balloonContainer.appendChild(balloon);

setTimeout(()=>{
balloon.remove();
},8000);

}

setInterval(createBalloon,800);


// Confetti Animation

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

for(let i=0;i<150;i++){
confetti.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*6+2,
speed:Math.random()*3+1
});
}

function drawConfetti(){

ctx.clearRect(0,0,canvas.width,canvas.height);

confetti.forEach(c=>{
ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
ctx.fillRect(c.x,c.y,c.size,c.size);
c.y+=c.speed;

if(c.y>canvas.height){
c.y=0;
}

});

requestAnimationFrame(drawConfetti);
}

drawConfetti();


// Celebrate Button

document.getElementById("celebrateBtn").onclick = () => {
alert("🎉 Let's Celebrate the Birthday! 🎂");
};