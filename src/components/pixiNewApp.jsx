// import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Application, Assets, Container, Sprite, Text } from "pixi.js";
import React, { useEffect, useRef } from "react";
import bgCover from "../assets/bgCover.png";
import ring1 from "../assets/ring/ring1.png";
import ring2 from "../assets/ring/ring2.png";
import ring3 from "../assets/ring/ring3.png";
import board from "../assets/board.png";
import boardText from "../assets/boardText.png";
import ringButton from "../assets/ring/ringButton.png";
import { useSocketContext } from "../context/socketContext";

const headingX = 165;

// Helper functions
const createText = (text, style, x, y, anchor = 0.5) => {
  const textObj = new Text(text, style);
  textObj.x = x;
  textObj.y = y;
  textObj.anchor.set(anchor);
  return textObj;
};

const createButton = (text, container, x, y, onClick) => {
  const button = createText(text, { ...textStyle, fill: "black" }, x, y);
  button.interactive = true;
  button.cursor = "pointer";
  button.buttonMode = true;
  button.on("pointerdown", onClick);
  container.addChild(button);
  return button;
};

const createConfirmButton = (container, x, y, onConfirm) => {
  const button = createText("Confirm", { ...textStyle, fill: "green" }, x, y);
  button.interactive = true;
  button.buttonMode = true;
  button.cursor = "pointer";
  button.visible = false; // Initially hidden
  button.on("pointerdown", onConfirm);
  container.addChild(button);
  return button;
};

const textStyle = {
  fontFamily: "Arial",
  fontSize: 24,
  fill: "black",
  align: "center",
};

const loadTextures = async () => {
  const ring1Texture = await PIXI.Assets.load(ring1);
  const ring2Texture = await PIXI.Assets.load(ring2);
  const ring3Texture = await PIXI.Assets.load(ring3);
  const ringButtonTexture = await PIXI.Assets.load(ringButton);

  return { ring1Texture, ring2Texture, ring3Texture, ringButtonTexture };
};

const animation = (ring3, x) => {
  const fullRotation = 360; // 360 degrees for a full rotation
  const totalSpins = 1; // Number of full spins before it starts slowing down
  const targetRotation = Math.random() * fullRotation; // Random end rotation for unpredictability

  // Set anchor to the center so the image rotates around its middle
  ring3.anchor.set(0.5);

  // Adjust position to ensure it's properly centered
  ring3.x = x ? ring3.width / 2 + 40 : ring3.width / 2;
  ring3.y = x ? ring3.width / 2 + 40 : ring3.width / 2;
  // ring3.x = ring3.width / 2 + 30;
  // ring3.y = ring3.height / 2 + 30;

  gsap.to(ring3, {
    rotation: `+=${totalSpins * fullRotation + targetRotation}`,
    duration: 6,
    ease: "power4.out",
    onComplete: () => {
      console.log("Spin complete!");
      // Add any post-spin logic here, like determining the result
    },
  });
};

const PixiNewApp = () => {
  const { socket, currentWallet, setCurrentWallet, userId } =
    useSocketContext();
  const pixiRef = useRef(null);
  const balanceTextRef = useRef(null); // Reference to the balance text

  useEffect(() => {
    const app = new Application({
      background: "#fca5a5",
      resizeTo: window,
      autoDensity: true,
    });

    const container = new Container();
    app.stage.addChild(container);

    const uiContainer = new Container();
    app.stage.addChild(uiContainer);

    if (pixiRef.current) {
      pixiRef.current.appendChild(app.view);
    }

    // Adjust background size
    function adjustBackgroundSize(container, app) {
      // Add your background adjustment logic here
    }

    const onResize = () => {
      adjustBackgroundSize(container, app);
    };

    window.addEventListener("resize", onResize);
    onResize(); // Initial resize adjustment

    let gameGroundCover;
    let Ring1;
    let Ring2;
    let Ring3;
    let ringButtonMid;

    Assets.load(bgCover).then((texture) => {
      gameGroundCover = new Sprite(texture);

      // Set sprite properties like position, size, etc.
      // sprite.x = ;
      // sprite.y = 10;
      gameGroundCover.width = app.view?.width;
      gameGroundCover.height = app.view?.height;

      // Add the sprite to the container
      container.addChild(gameGroundCover);
    });

    // TEXT FOR BALANCE AND WALLET
    const balance = createText(
      "$ Balance",
      textStyle,
      app.view.width / 2 - 100,
      10
    );
    const wallet = createText(
      "Bet Amount",
      textStyle,
      app.view.width / 2 + 100,
      10
    );

    balanceTextRef.current = new Text(
      `$ ${currentWallet?.wallet || 0}`, // Use currentWallet if it exists, else 0
      textStyle
    );
    balanceTextRef.current.x = app.view.width / 2 - 150;
    balanceTextRef.current.y = 35;

    // container.addChild(balanceTextRef.current);
    // const balanceText = createText(
    //   `$ ${currentWallet.wallet ? currentWallet.wallet : 0}`,
    //   textStyle,
    //   app.view.width / 2 - 70,
    //   35
    // );
    const walletText = createText(
      "$ 0",
      textStyle,
      app.view.width / 2 + 130,
      35
    );

    uiContainer.addChild(balance);
    uiContainer.addChild(wallet);
    uiContainer.addChild(balanceTextRef.current);
    uiContainer.addChild(walletText);
    // uiContainer.addChild(balanceText);

    // container.addChild(balance);
    // container.addChild(wallet);

    // CONTAINER FOR SELECTING AN ELEMENT
    const characters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const elementContainer = new Container();
    elementContainer.x = app.view.width / 2 - 150;
    elementContainer.y = 400;
    app.stage.addChild(elementContainer);

    // CONTAINER FOR BETING A AMOUNT ON ELEMENT
    const betingContainer = new Container();
    betingContainer.x = app.view.width / 2 - 150;
    betingContainer.y = 400;
    betingContainer.visible = false;
    app.stage.addChild(betingContainer);

    // CONTAINER FOR YOUR SPIN RESULT
    const resultContainer = new Container();
    app.stage.addChild(resultContainer);

    const gameRingContainer = new Container();
    app.stage.addChild(gameRingContainer);
    gameRingContainer.x = app.view.width / 2 - 120;
    gameRingContainer.y = 100;

    let spinBetAmount = 0;
    let activeButton = null;
    let confirmButton = null;

    confirmButton = createConfirmButton(
      elementContainer,
      3 * 40 + 25,
      100,
      () => {
        elementContainer.children.forEach((child) => (child.visible = false));
        confirmButton.visible = false;
        betingContainer.visible = true;
      }
    );

    const heading = createText(
      "Please, Select an element",
      textStyle,
      headingX,
      10
    );
    elementContainer.addChild(heading);

    characters.forEach((char, index) => {
      const xPosition = index * 40 + 25;
      const button = createButton(char, elementContainer, xPosition, 50, () => {
        if (activeButton && activeButton !== button) {
          activeButton.style.fill = "black";
        }
        button.style.fill = "green";
        confirmButton.visible = true;
        activeButton = button;
        // console.log(activeButton._text);
      });
      button.style.fill = "black";
    });

    const betingHeading = createText(
      "Please, Set bet amount...",
      textStyle,
      headingX,
      10
    );
    betingContainer.addChild(betingHeading);

    // const button = new Button(
    //   new Graphics().beginFill(0xffffff).drawRoundedRect(0, 0, 100, 50, 15)
    // );
    // betingContainer.addChild(button);

    // Assets.load(ring1).then((texture) => {
    //   Ring1 = new Sprite(texture);

    //   // Set sprite properties like position, size, etc.
    //   // sprite.x = ;
    //   // sprite.y = 10;
    //   Ring1.width = 280;
    //   Ring1.height = 280;

    //   // Add the sprite to the container
    //   gameRingContainer.addChild(Ring1);
    // });

    // Assets.load(ring2).then((texture) => {
    //   Ring2 = new Sprite(texture);

    //   // Set sprite properties like position, size, etc.
    //   // sprite.x = ;
    //   // sprite.y = 10;
    //   Ring2.width = 280;
    //   Ring2.height = 280;

    //   // Add the sprite to the container
    //   gameRingContainer.addChild(Ring2);
    // });

    // Assets.load(ring3).then((texture) => {
    //   Ring3 = new Sprite(texture);

    //   // Set sprite properties like position, size, etc.
    //   Ring3.x = 30;
    //   Ring3.y = 30;
    //   Ring3.width = 220;
    //   Ring3.height = 220;

    //   // Add the sprite to the container
    //   gameRingContainer.addChild(Ring3);
    // });

    // Assets.load(ringButton).then((texture) => {
    //   ringButtonMid = new Sprite(texture);

    //   // Set sprite properties like position, size, etc.
    //   ringButtonMid.x = 99;
    //   ringButtonMid.y = 99;
    //   ringButtonMid.width = 80;
    //   ringButtonMid.height = 80;

    //   // Add the sprite to the container
    //   gameRingContainer.addChild(ringButtonMid);
    // });

    Assets.load(board).then((texture) => {
      Ring1 = new Sprite(texture);

      // Set sprite properties like position, size, etc.
      // sprite.x = ;
      // sprite.y = 10;
      Ring1.width = 280;
      Ring1.height = 280;

      // Add the sprite to the container
      gameRingContainer.addChild(Ring1);
    });

    Assets.load(boardText).then((texture) => {
      Ring2 = new Sprite(texture);

      // Set sprite properties like position, size, etc.
      // sprite.x = ;
      // sprite.y = 10;
      // Ring2.anchor = 0.5
      Ring2.x = Ring1?.width / 7;
      Ring2.y = Ring1?.height / 7;
      Ring2.width = 200;
      Ring2.height = 200;

      // Add the sprite to the container
      gameRingContainer.addChild(Ring2);
    });

    // const sprite = new Sprite(texture);

    const betAmount = createText(
      `$ ${spinBetAmount}`,
      textStyle,
      headingX,
      // betingContainer.width / 2 - 20,
      45
    );
    betingContainer.addChild(betAmount);

    createButton(
      "+ 10",
      betingContainer,
      // betingContainer.x - 250,
      headingX - 100,
      45,
      () => {
        spinBetAmount += 10;
        betAmount.text = `$ ${spinBetAmount}`;
        updateSpinButtonVisibility();
      }
    );

    createButton(
      "- 10",
      betingContainer,
      // app.view.width / 2 - 220,
      headingX + 100,
      45,
      () => {
        if (spinBetAmount === 0) return;
        spinBetAmount -= 10;
        betAmount.text = `$ ${spinBetAmount}`;
        updateSpinButtonVisibility();
      }
    );

    let spinButtonResult = {};

    const spinButton = createButton(
      "Spin",
      betingContainer,
      headingX,
      85,
      () => {
        if (spinBetAmount === 0) return;
        console.log("Spin with bet amount:", spinBetAmount);

        console.log({
          betAmount: spinBetAmount,
          bet: activeButton._text,
          userId,
        });

        // if (socket) {
        socket?.emit("spin", {
          betAmount: spinBetAmount,
          bet: activeButton._text,
          userId,
        });

        setCurrentWallet((pre) => ({
          ...pre,
          wallet: pre.wallet - spinBetAmount,
        }));

        animation(Ring1, false);
        animation(Ring2, true);

        socket?.on("spinResult", (spinResult) => {
          console.log("spinResult", spinResult);

          if (spinResult) {
            spinButtonResult = { ...spinResult };
          }
        });
        // }
      }
    );
    spinButton.visible = false;

    const updateSpinButtonVisibility = () => {
      if (spinBetAmount == 0) {
        spinButton.visible = false;
      } else {
        spinButton.visible = true;
      }
    };

    return () => {
      window.removeEventListener("resize", onResize);
      app.destroy(true, { children: true });
    };
  }, [socket]);

  useEffect(() => {
    if (balanceTextRef.current) {
      balanceTextRef.current.text = `$ ${currentWallet?.wallet || 0}`;
    }
  }, [currentWallet]);

  return <div ref={pixiRef} style={{ width: "100%", height: "100%" }} />;
};

export default PixiNewApp;

// CREATE BUTTON FUNCTION
//  const createButton = (text, container, x, y, onClick) => {
//   const button = new PIXI.Text(text, { fill: "white" });
//   button.interactive = true;
//   button.buttonMode = true;
//   button.anchor.set(0.5);
//   button.position.set(x, y);
//   button.on("pointerdown", onClick);
//   container.addChild(button);
//   return button;
// };
