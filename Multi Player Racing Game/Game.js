class Game {
  constructor() {

  }
  async Game_State_Listener() {
    var refer = DB.ref("Game_State")
    await refer.on('value', (data) => {
      gameState = data.val();
    })
  }
  Game_State_Writer(State) {
    DB.ref().update({
      Game_State: State
    })
  }
  Start() {
    if (gameState === 0) {
      player = new Player();
      var refer = DB.ref('Player_Count')
      refer.once('value').then((snapshot) => {
        var a = snapshot.exists();
        if (a == true) {
          Player_Count = snapshot.val();
          player.Count_Listener();
        }
      })
      form_obj = new Form();
      form_obj.display();
    }
    car_1 = createSprite(200, 100, 100, 100)
    car_2 = createSprite(400, 100, 100, 100)
    car_3 = createSprite(600, 100, 100, 100)
    car_4 = createSprite(800, 100, 100, 100)
    sprites = [car_1,car_2,car_3,car_4]
  }

  Play() {
    form_obj.hide();
    Player.Players_Listener();
    if (all_players != undefined) {
      for (var i in all_players) {
        index += 1
        x += 200
        y = displayHeight - all_players[i].distance;
        sprites[0].x = x;
        sprites[0].y = y;
        if (index == player.index) {
          sprites[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2
          camera.position.y = sprites[index - 1].y
        }
      }
    }
    if (keyIsDown(UP_ARROW)) {
      player.distance += 20
      player.Player_Writer();
    }
    drawSprites();
  }
}