import * as PIXI from "pixi.js";
import React, { useEffect, useRef } from "react";
import { useSocketContext } from "../context/socketContext";

const headingX = 165;

// Helper functions
const createText = (text, style, x, y, anchor = 0.5) => {
  const textObj = new PIXI.Text(text, style);
  textObj.x = x;
  textObj.y = y;
  textObj.anchor.set(anchor);
  return textObj;
};

const createButton = (text, container, x, y, onClick) => {
  const button = createText(text, { ...textStyle, fill: "white" }, x, y);
  button.interactive = true;
  button.buttonMode = true;
  button.on("pointerdown", onClick);
  container.addChild(button);
  return button;
};

const createConfirmButton = (container, x, y, onConfirm) => {
  const button = createText("Confirm", { ...textStyle, fill: "green" }, x, y);
  button.interactive = true;
  button.buttonMode = true;
  button.visible = false; // Initially hidden
  button.on("pointerdown", onConfirm);
  container.addChild(button);
  return button;
};

const textStyle = {
  fontFamily: "Arial",
  fontSize: 24,
  fill: 0xffffff,
  align: "center",
};

const PixiNewApp = () => {
  const { socket, currentWallet, setCurrentWallet, userId } =
    useSocketContext();
  const pixiRef = useRef(null);
  const balanceTextRef = useRef(null); // Reference to the balance text

  useEffect(() => {
    const app = new PIXI.Application({
      background: "#fca5a5",
      resizeTo: window,
      autoDensity: true,
    });

    const container = new PIXI.Container();
    app.stage.addChild(container);

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

    balanceTextRef.current = new PIXI.Text(
      `$ ${currentWallet?.wallet || 0}`, // Use currentWallet if it exists, else 0
      textStyle
    );
    balanceTextRef.current.x = app.view.width / 2 - 150;
    balanceTextRef.current.y = 35;
    container.addChild(balanceTextRef.current);
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

    container.addChild(balance);
    container.addChild(wallet);
    container.addChild(walletText);
    // container.addChild(balanceText);

    // CONTAINER FOR SELECTING AN ELEMENT
    const characters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const elementContainer = new PIXI.Container();
    elementContainer.x = app.view.width / 2 - 150;
    elementContainer.y = 200;
    app.stage.addChild(elementContainer);

    // CONTAINER FOR BETING A AMOUNT ON ELEMENT
    const betingContainer = new PIXI.Container();
    betingContainer.x = app.view.width / 2 - 150;
    betingContainer.y = 200;
    betingContainer.visible = false;
    app.stage.addChild(betingContainer);

    // CONTAINER FOR YOUR SPIN RESULT
    const resultContainer = new PIXI.Container();
    app.stage.addChild(resultContainer);

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
          activeButton.style.fill = "white";
        }
        button.style.fill = "black";
        confirmButton.visible = true;
        activeButton = button;
        // console.log(activeButton._text);
      });
    });

    const betingHeading = createText(
      "Please, Set bet amount...",
      textStyle,
      headingX,
      10
    );
    betingContainer.addChild(betingHeading);

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

        socket?.on("spinResult", (spinResult) => {
          console.log("spinResult", spinResult);

          if (spinResult) {
            // setCurrentWallet((pre) => ({
            //   ...pre,
            //   wallet: pre.wallet - spinBetAmount,
            // }));
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
