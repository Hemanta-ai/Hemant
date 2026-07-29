*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,Helvetica,sans-serif;
}

body{
background:#0f172a;
color:white;
}

header{
display:flex;
justify-content:space-between;
align-items:center;
padding:20px 8%;
background:#111827;
position:sticky;
top:0;
}

.logo{
font-size:28px;
font-weight:bold;
color:#38bdf8;
}

nav a{
color:white;
text-decoration:none;
margin-left:25px;
transition:.3s;
}

nav a:hover{
color:#38bdf8;
}

.hero{
display:flex;
justify-content:space-between;
align-items:center;
padding:80px 8%;
flex-wrap:wrap;
}

.content{
max-width:600px;
}

.content h3{
font-size:28px;
}

.content h1{
font-size:60px;
margin:10px 0;
color:#38bdf8;
}

.content h2{
font-size:35px;
margin-bottom:20px;
}

.content p{
font-size:18px;
line-height:1.7;
margin-bottom:30px;
}

.btn{
display:inline-block;
padding:12px 30px;
background:#38bdf8;
color:#000;
text-decoration:none;
border-radius:30px;
font-weight:bold;
transition:.3s;
}

.btn:hover{
background:white;
}

.image img{
width:380px;
border-radius:50%;
border:8px solid #38bdf8;
box-shadow:0 0 40px #38bdf8;
}

.social{
margin-top:30px;
}

.social a{
display:inline-flex;
width:45px;
height:45px;
justify-content:center;
align-items:center;
border:2px solid #38bdf8;
border-radius:50%;
color:#38bdf8;
margin-right:15px;
text-decoration:none;
font-size:20px;
transition:.3s;
}

.social a:hover{
background:#38bdf8;
color:black;
}

.about{
padding:80px 8%;
text-align:center;
background:#1e293b;
}

.about h2{
font-size:45px;
margin-bottom:25px;
}

.about p{
max-width:800px;
margin:auto;
font-size:18px;
line-height:1.8;
}

#contact{
padding:80px 8%;
text-align:center;
}

#contact h2{
font-size:40px;
margin-bottom:30px;
}

form{
max-width:600px;
margin:auto;
display:flex;
flex-direction:column;
gap:20px;
}

input,textarea{
padding:15px;
border:none;
outline:none;
border-radius:8px;
font-size:16px;
}

button{
padding:15px;
background:#38bdf8;
border:none;
border-radius:8px;
font-size:18px;
font-weight:bold;
cursor:pointer;
}

button:hover{
background:white;
}

footer{
background:#111827;
padding:20px;
text-align:center;
margin-top:50px;
}

@media(max-width:900px){

.hero{
flex-direction:column;
text-align:center;
}

.image img{
width:280px;
margin-top:40px;
}

.content h1{
font-size:45px;
}

}
