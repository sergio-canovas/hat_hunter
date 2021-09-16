const prompt = require('prompt-sync')({sigint: true}); //Prompter module

//Consts 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//Class Field
class Field {
  constructor(field){
      this.field = field;
      this.myPosition=[0,0]
  }
  //Print the field
  print(){
    for(let i=0; i<this.field.length;i++){
      console.log(this.field[i].join(""))
    }
  }

  //Check what happens after order
  check(v1,v2){
      let a,b
      [a,b]=this.myPosition;
      console.log(this.myPosition)
       if(this.field[a+v1]!=undefined && this.field[a+v1][b+v2]!=undefined){
      //If not wall
        if(this.field[a+v1][b+v2]===hole){ //If hole -> lost
              console.log("You lost!!")
              process.exit()
          } 
        else if(this.field[a+v1][b+v2]===hat){ //If hat -> Win
              console.log("You found it!!")
              process.exit()
          }
        else { //Move
              this.field[a][b]=fieldCharacter;
              this.field[a+v1][b+v2]=pathCharacter;
              this.myPosition = [a+v1,b+v2]
          }

         
      } else{
        console.log("There's a wall");
      }
  }

  //Field generator
  static generateField(height,width){
    let level= new Array();
    for (let i=0;i<width;i++){
      level.push([])
      for(let j=0;j<height;j++){
          let random= Math.floor(Math.random()*(height*width));
          
          //Put holes on field.
          if (random>(height*width)/20){
            level[i].push(fieldCharacter);
          } else {
            level[i].push(hole);
          }
      }
    }
    //Put hat on field
    let yHat=Math.floor(Math.random()*height);
    let xHat=Math.floor(Math.random()*width);
    level[yHat][xHat]=hat;
    //Put character on field
    level[0][0]=pathCharacter
    return level;
  }  

}




const myField = new Field(Field.generateField(12,12))



myField.print();

function way(){
  let cursor = prompt("Wich way?")
  switch (cursor){
    case "u":
      myField.check(-1,0)
      break;
    case "d":
      myField.check(1,0)
      break;
    case "l":
      myField.check(0,-1)
      break;
    case "r":
        myField.check(0,1)
      break;
    default:
      console.log("Insert a right value");
  };
  myField.print();
  way()

}
way()