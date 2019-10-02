/*
  
/////////////////////////////////
  Brush Class
  En aquesta classe definim totes les funcions que té el brush.
  by: Ivan Ortega, Alejandro Ruiz
/////////////////////////////////
  
  Print(); // Retorna un string amb la posició del pinzell
  move(); // Determina la posició del pinzell a cada iteració, així com la seva transparència i mida
  display(); // Pinta el pinzell
  finish(); // Comprova si s'ha acabat el temps de vida del pinzell

*/

class Brush{
    constructor(x,y,up){
      this.x = x;
      this.y = y;
      this.hue = random(360); //Color hue
      this.volta = 0; //Contador voltes (temps de vida)
      this.maxVolta = 400; //Maxim temps de vida
      this.up = up; //Direccio
      this.speed = random(0,2); //Velocitat del pinzell
      this.ellipseW = random(20,100); //Amplada pinzell
      this.ellipseH = random(20,100); //Alçada pinzell
      this.decW = random(0.0,1.0); //Decrement del width a cada iteracio
      this.decH =  random(0.0,1.0); //Decrement del height a cada iteracio
      this.transparency = random(10,200); //Transparencia inicial
      this.xoff = 0.0; 
  
      this.dirNoise = int(random(2)); //Direccio del soroll
      this.hide = int(random(2)); //Ocultem la meitat dels pinzells creats, per no sobrecarregar
    }
    print(){
      //Funcrio debug, per veure la posicio
      return("Pos: " + this.x + ", " + this.y);
    }
    move(){
      //Comprovem que no sobrepasi el temps de vida del pinzell
      if(this.volta <= this.maxVolta){
        /*
        if (this.hue > 360) {
          this.hue = 0;
        } else {
          this.hue++;
        }
        */
        
        // Modifiquem la mida del pinzell
        /*
        if(this.ellipseW >= 100 || this.ellipseW <= -1){
          this.decW *= -1;
        }
        if(this.ellipseH >= 100 || this.ellipseH <= -100){
          this.decH *= -1;
        }
        this.ellipseW += this.decW;
        this.ellipseH += this.decH;
        */
        
        //Modifiquem la trajectoria del pinzell amb el noise
        this.xoff += 0.01;
        let n = noise(this.xoff);
  
        if(this.dirNoise==1){
          this.x -= n*1;
        }else{
          this.x += n*1;
        }
        //this.x = map(this.x,0,width, this.initX - 50, this.initX + 50)
        
        //Mirem cap a quina direcció ha d'anar el pinzell
        if(this.up){
          this.y += this.speed;
          
        }else{
          this.y -= this.speed;
          
        }
        //Disminuim el temps de vida
        this.volta += 1;
        //El fem mes transparent a cada iteració
        this.transparency -= 0.5;
      }
      
    }
    display(){
      //Si no ha finalitzat, pintem el pinzell
      if(!this.finish()){
        noStroke();
        fill(this.hue, 200, 201,this.transparency);
        ellipse(this.x, this.y, this.ellipseW,this.ellipseH );
      }
      
    }
    finish(){
      //Comprovem si ha finalitzat
      if(this.volta >= this.maxVolta || this.hide == 1){
        return true;
      }else{
        return false;
      }
    }
  }