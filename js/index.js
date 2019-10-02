var ballsPosition = [];
let speed = 0; // 0 maxima velocitat, com mes alt més lent
let next = 0;
function setup() {
  
  createCanvas(innerWidth, innerHeight);
  
  colorMode(RGB,255);
  background(255, 252, 230);
  colorMode(HSL,360);
  //setShakeThreshold(30);
}

function draw() {
  //Mentre no hagi pintat totes les pinzellades pintem. Un cop finalitzat reiniciem l'array
  if (millis() > next) {
    if(!allBallsDone() ){
      allBallsDisplay();
    }else {
      ballsPosition = [];
    }
    next = millis() + speed;
  }
  

}

function allBallsDone(){
  //Comprovem que totes els pinzells hagin finalitzat
  for (let i = 0; i < ballsPosition.length - 1; i++) {
    if(!ballsPosition[i].finish()){
      return false;
    }
  }
  return true;
}
function allBallsDisplay(){
  //Pintem totes les pinzellades
  for (let i = 0; i < ballsPosition.length - 1; i++) {
    ballsPosition[i].move();
    ballsPosition[i].display();
  }
}

function mouseDragged() {
  //Mentre el mouse estigui apretat, afegim 2 pinzells a l'array de pinzells, un amb direccio cap amunt i un altre amb direccio cap abaix 
  ballsPosition.push(new Brush(mouseX,mouseY,true));
  ballsPosition.push(new Brush(mouseX,mouseY,false));
}

function deviceShaken(){
    //Netejem la pantalla
    for (let i = 0; i < ballsPosition.length - 1; i++) {
        ballsPosition[i].hide = true;
    }
    ballsPosition = [];
    colorMode(RGB,255);
    background(255, 252, 230);
    colorMode(HSL,360);
}