*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#ffd6e7,#ffe9f4,#f3e8ff);
height:100vh;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
}

/* Instagram phone frame */

.phone{
width:100%;
max-width:420px;
height:100vh;
position:relative;
overflow:hidden;
}

/* Pages */

.page{
position:absolute;
width:100%;
height:100%;
padding:40px 20px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
text-align:center;

background:transparent;

transform:translateY(100%);
transition:0.7s ease;
}

.page.active{
transform:translateY(0);
}

/* Card */

.card{
background:white;
padding:40px 20px;
border-radius:25px;
box-shadow:0 15px 40px rgba(0,0,0,0.15);
margin:20px 0;
}

h1,h2{
color:#b14a7d;
}

.tap{
color:#777;
margin-bottom:10px;
}

/* Button */

button{
padding:14px 30px;
border:none;
border-radius:30px;
background:linear-gradient(45deg,#ff9ecf,#cba6ff);
color:white;
font-size:16px;
cursor:pointer;
margin-top:20px;
}

/* Balloons */

.balloons{
display:flex;
gap:15px;
margin-top:40px;
}

.balloon{
width:70px;
height:90px;
border-radius:50%;
background:radial-gradient(circle at 30% 30%,#fff,#ff9ecf);
cursor:pointer;
transition:0.4s;
}

.balloon:nth-child(2){
background:radial-gradient(circle,#fff,#ffc0cb);
}

.balloon:nth-child(3){
background:radial-gradient(circle,#fff,#ffb6c1);
}

.balloon:nth-child(4){
background:radial-gradient(circle,#fff,#e0aaff);
}

.balloon.pop{
transform:scale(0);
opacity:0;
}

/* Final cake */

.final h1{
font-family:'Pacifico',cursive;
font-size:30px;
margin-bottom:20px;
}

.cake{
font-size:90px;
animation:float 2s infinite ease-in-out;
}

@keyframes float{
0%{transform:translateY(0)}
50%{transform:translateY(-15px)}
100%{transform:translateY(0)}
}

canvas{
position:fixed;
top:0;
left:0;
pointer-events:none;
}
