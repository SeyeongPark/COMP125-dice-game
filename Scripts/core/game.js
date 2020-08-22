/* File name : game.js
Author's name : Seyeong Park
Web site name : SY's Dice Roll
File description: This is game.js file. This file is a sub file of this project's applocation. 
Here also have all logic for rolling dice */

"use strict";
let Game = (function () {
    /* variable declarations*/
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let RollButton;
    /* For position of three dices*/
    let leftReel;
    let middleReel;
    let rightReel;
    /* For bitmap images of three dices*/
    let leftReelImage;
    let middleReelImage;
    let rightReelImage;
    /* Label for result of dice faces */
    let leftResuLabel;
    let middleResuLabel;
    let rightResLabel;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "sign1", src: "./Assets/images/sign1.bmp" },
        { id: "sign2", src: "./Assets/images/sign2.bmp" },
        { id: "sign3", src: "./Assets/images/sign3.bmp" },
        { id: "sign4", src: "./Assets/images/sign4.bmp" },
        { id: "sign5", src: "./Assets/images/sign5.bmp" },
        { id: "sign6", src: "./Assets/images/sign6.bmp" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "roll", src: "./Assets/sounds/roll.wav" },
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; /* make a reference to the assets in the global config*/
        Main();
    }
    function Reels() {
        var diceLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var roll = 0; roll < 3; roll++) {
            outCome[roll] = Math.floor((Math.random() * 6) + 1); /*from 1 to 6*/
            switch (outCome[roll]) {
                case 1:
                    diceLine[roll] = "1";
                    break;
                case 2:
                    diceLine[roll] = "2";
                    break;
                case 3:
                    diceLine[roll] = "3";
                    break;
                case 4:
                    diceLine[roll] = "4";
                    break;
                case 5:
                    diceLine[roll] = "5";
                    break;
                case 6:
                    diceLine[roll] = "6";
                    break;
            }
        }
        return diceLine;
    }
    function buildInterface() {
        /* Interfaces for dice*/
        leftReel = new Core.GameObject("3", Config.Screen.CENTER_X - 200, Config.Screen.CENTER_Y - 200, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("2", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 200, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("6", Config.Screen.CENTER_X + 200, Config.Screen.CENTER_Y - 200, true);
        stage.addChild(rightReel);

        /* Interface for Lables of dice results*/
        leftResuLabel = new UIObjects.Label("3", "40px", "Consolas", "#000000", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y + 80, true);
        stage.addChild(leftResuLabel);
        middleResuLabel = new UIObjects.Label("2", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 80, true);
        stage.addChild(middleResuLabel);
        rightResLabel = new UIObjects.Label("6", "40px", "Consolas", "#000000", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y + 80, true);
        stage.addChild(rightResLabel);
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        buildInterface();
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        console.log("Dice is readly to roll !");
        RollButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 160, true);
        stage.addChild(RollButton);
        RollButton.on("click", () => {
            let reels = Reels();
            createjs.Sound.play("roll");
            // Show result of dices image
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);
            // Show bitmab image for the die faces
            leftResuLabel.text = (reels[0].toString());
            middleResuLabel.text = (reels[1].toString());
            rightResLabel.text = (reels[2].toString());
            // Show the result of dices
            console.log("----------------------------");
            console.log("Your dice is : " + reels[0] + " , " + reels[1] + " , " + reels[2]);
        });
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map