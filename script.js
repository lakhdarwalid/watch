let canvas  =  document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = 50;
let pointSize =8;
let secSize = 4;
canvas.width = 400;
canvas.height = 400;
let radius = 150;

class Point{
    constructor(x, y, color, size){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    }
    renderPoint(){
        ctx.fillStyle = this.color ;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

let center = new Point(200,200, 'black', pointSize);
center.renderPoint();
let points = [];
let tempPoints=[];
let tempSize = 0;
let pointColor = null;
for (let i = 0; i<60; i++){
    if (i%5==0) {
        tempSize = pointSize;
        pointColor = 'black';
    }
    else {
        tempSize = secSize;
        pointColor= 'black';
    }
    let p= new Point(center.x+radius*Math.cos(i*Math.PI/30), center.y+radius*Math.sin(i*Math.PI/30
        ) , pointColor, tempSize);
    p.renderPoint();
    if (i<45) tempPoints.push(p);
    else points.push(p);
}
tempPoints.forEach(point=>points.push(point));
tempPoints=[];

const loop = setInterval(()=>{
    let time = new Date();
    clearHeart(time);
    connect(center, points[time.getSeconds()], 'black',1);
    connect(center, points[time.getMinutes()], 'gray',3);
    let hours = time.getHours();
    if (hours>12)hours-=12;
    if (time.getMinutes()>30 && time.getMinutes()<45)
        connect(center, points[(hours* 5)+2], 'gray',5);
    else if (time.getMinutes()>=45 && time.getMinutes()<=59)
        connect(center, points[(hours* 5)+4], 'gray',5);
    else connect(center, points[(hours* 5)], 'gray',5);
},1000)

function connect(point1, point2, color, lineWidth){
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    if (lineWidth==5) {
        ctx.lineTo(center.x+(radius*3/4)*Math.cos((points.indexOf(point2)-15)*Math.PI/30),
        center.y+(radius*3/4)*Math.sin((points.indexOf(point2)-15)*Math.PI/30));
    }
    else ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
    point2.color = 'red';
    point2.renderPoint();
}

function clearHeart(time){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius + pointSize, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    center.renderPoint();
    points.forEach(point=>{  point.color = 'black';
                             point.renderPoint()
    });
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(time.toLocaleString('default', { month: 'short' }),
    center.x+(radius*3/4)*Math.cos(35*Math.PI/30),
    center.x+(radius*3/4)*Math.sin(32*Math.PI/30));
    ctx.fillText(time.getUTCDate(),
                center.x+(radius*3/4)*Math.cos(37*Math.PI/30),
                center.x+(radius*3/4)*Math.sin(26*Math.PI/30));
    ctx.font = '15px vivaldi'; 
    ctx.fillText('Lakhdar',
                center.x+(radius/2)*Math.cos(18*Math.PI/30),
                center.x+(radius/2)*Math.sin(45*Math.PI/30));
    ctx.font = '15px vivaldi';
    ctx.fillText('Made by Walid',
                center.x+(radius/2)*Math.cos(21*Math.PI/30),
                center.x+(radius)*Math.sin(24*Math.PI/30));
}


    