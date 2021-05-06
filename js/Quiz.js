class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
     contestant = new Contestant();
      var playerCountRef = await database.ref('contestantCount').once("value");
      if(playerCountRef.exists()){
        contestantCount = playerCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow")
    textSize(30);
    fill("black")
    text("Result Of the Quiz", 340, 50)
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      var display_position = 230;
      fill("blue")
      textSize(20)
      text("NOTE:contestant who answered correct are highlighted in green color",130,230)
      for(var plr in allContestants){
        var correctAnswer="2"
        if (correctAnswer === allContestants[plr].answer)
          fill("green")
        else
          fill("red");

        display_position+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_position)
      }
    }
  }
}
