import { useState, useEffect, useMemo, useRef } from "react";
import { TextStyle, FederatedPointerEvent } from "pixi.js";
import { Stage, Container, Text, Sprite } from "@pixi/react";
import airport from "../assets/bg/bg_ground_1@3x.webp";
import spinner from "../assets/spinner.png";
import stopper from "../assets/stopper.png";

const PixiApp = () => {
  const [word, setWord] = useState("hello");
  const [selectedChar, setSelectedChar] = useState(null);

  const spinnerRef = useRef(null);
  const stopperRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log("dimensions.width / 2", dimensions.width);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      if (spinnerRef.current && stopperRef.current) {
        const spinnerWidth = spinnerRef.current.width;
        const spinnerHeight = spinnerRef.current.height;
        const stopperWidth = stopperRef.current.width;
        const stopperHeight = stopperRef.current.height;

        // Position spinner in the center
        spinnerRef.current.x = dimensions.width / 2 - spinnerWidth / 2;
        spinnerRef.current.y = dimensions.height / 2 - spinnerHeight / 2;

        // Position stopper above the spinner
        stopperRef.current.x = dimensions.width / 2 - stopperWidth / 2;
        stopperRef.current.y =
          dimensions.height / 2 - spinnerHeight / 2 - stopperHeight / 2;
      }
    };

    // Ensure the sprites are loaded before positioning
    const timer = setTimeout(updatePositions, 0);

    return () => clearTimeout(timer);
  }, [dimensions]);

  const textStyle = useMemo(() => {
    return new TextStyle({
      align: "center",
      fontSize: 35,
    });
  }, []);

  const textStyleBalance = useMemo(() => {
    return new TextStyle({
      align: "center",
      fontSize: 30,
    });
  }, []);

  //
  //
  //
  const characters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Calculate spacing between characters
  const spacing = 30; // Adjust spacing as needed
  const totalWidth = characters.length * 36 + (characters.length - 1) * spacing; // Text width + spacing
  const startX = (dimensions.width - totalWidth) / 2; // Center alignment

  // Calculate spacing between characters
  // const spacing = 30; // Adjust spacing as needed
  // const textWidth = 36; // Width of each text element (same as fontSize here)

  // // Calculate total width for all characters including spacing
  // const totalWidth =
  //   characters.length * textWidth + (characters.length - 1) * spacing;

  // // Calculate the starting X position to center characters
  // const startX = (dimensions.width - totalWidth) / 2;

  const handleClick = (char) => {
    setSelectedChar(char); // Update the selected character state
    console.log(`Character ${char} clicked!`);
  };

  return (
    <Stage
      width={dimensions.width} // Set stage width to window width
      height={dimensions.height} // Set stage height to window height
      options={{
        backgroundColor: 0xfca5a5,
        autoDensity: true,
        interactive: true,
      }} // Background color in hex
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {/* HEADER PART */}
      <Container
        style={{
          position: "",
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        {/* Centered text */}
        <Container
          style={{
            position: "",
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <Text
            text="Balance."
            style={textStyle}
            x={dimensions.width / 2 - 130} // Center horizontally
            y={20} // Center vertically with adjustment
            anchor={0.5} // Center the text based on its position
          />
          <Text
            text="$1234"
            style={textStyleBalance}
            x={dimensions.width / 2 - 130} // Center horizontally
            y={60} // Center vertically with adjustment
            anchor={0.5} // Center the text based on its position
          />
        </Container>

        <Container
          style={{
            position: "",
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <Text
            text="Bet Amount"
            style={textStyle}
            x={dimensions.width / 2 + 130} // Center horizontally
            y={20} // Center vertically with adjustment
            anchor={0.5} // Center the text based on its position
          />
          <Text
            text="$0"
            style={textStyleBalance}
            x={dimensions.width / 2 + 130} // Center horizontally
            y={60} // Center vertically with adjustment
            anchor={0.5} // Center the text based on its position
          />
        </Container>
      </Container>
      {/* HEADER PART */}

      {/* HEADING */}
      <Container
        x={dimensions.width / 2}
        y={120}
        style={{
          position: "",
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <Text
          text="Select a element"
          style={textStyle}
          // width={(dimensions.width / 2) * 1.5}
          anchor={0.5}
        />
        <Text
          text="On which you want to set a bet."
          style={textStyle}
          y={30}
          anchor={0.5}
        />
      </Container>
      {/* HEADING */}

      <Container
        x={dimensions.width / 2}
        y={300}
        style={{
          position: "absolute",
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <Text
          text="Select a element"
          style={textStyle}
          // width={(dimensions.width / 2) * 1.5}
          anchor={0.5}
        />

        <Container x={-100} zIndex={999}>
          {characters.map((char, index) => (
            <Text
              key={char}
              text={char}
              style={textStyle}
              x={index * 28} // Position each text horizontally
              y={50} // Vertically center, adjust y-offset as needed
              anchor={0.5} // Centers each character
              interactive={true} // Make the text interactive
              // pointerdown={() => handleClick(char)} // Handle click event
              click={() => console.log("Pointer is over the text")}
              pointerdown={(e) => handleClick(char)}
            />
          ))}
        </Container>

        {/*  */}
      </Container>
    </Stage>
  );
};

export default PixiApp;

// {
//   /* <Container
//         options={{ backgroundColor: 0xfca6a5 }} // Background color in hex
//         style={{
//           position: "relative",
//           // backgroundColor: 0xfca6a5,
//         }}
//         x={0}
//         y={0}
//       >
//         <Sprite image={spinner} ref={spinnerRef} />
//         <Sprite image={stopper} ref={stopperRef} />
//       </Container> */
// }

export function Loader() {
  return (
    <div className="text-black w-full min-h-screen font-bold text-5xl text-center flex justify-center items-center">
      Loading.....
    </div>
  );
}

/*

// import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Application, Assets, Container, Sprite, Text } from "pixi.js";
import React, { useEffect, useRef } from "react";
import bgCover from "../assets/bgCover.png";
import ring1 from "../assets/ring/ring1.png";
import ring2 from "../assets/ring/ring2.png";
import ring3 from "../assets/ring/ring3.png";
import board from "../assets/board.png";
import PinBar from "../assets/pinBar.png";
import boardText from "../assets/boardText.png";
import ringButton from "../assets/ring/ringButton.png";
import { useSocketContext } from "../context/socketContext";
import { toast } from "sonner";

const headingX = 165;

// Helper functions
const createText = (text, style, x, y, anchor = 0.5) => {
  const textObj = new Text(text, style);
  textObj.x = x;
  textObj.y = y;
  textObj.anchor.set(anchor);
  return textObj;
};

const elementDegrees = {
  A: 0,
  B: -45,
  C: -90,
  D: -135,
  E: -180,
  F: -225,
  G: -270,
  H: -315,
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
  const targetRotation = 3; // Random end rotation for unpredictability
  // const targetRotation = Math.random() * fullRotation; // Random end rotation for unpredictability

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

const startSpinning = (ring, duration, x) => {
  gsap.killTweensOf(ring); // Kill any ongoing tweens for this object

  ring.anchor.set(0.5); // Ensure it's rotating around the center

  // Reset the rotation before starting a new spin
  ring.rotation = 0;

  ring.x = x ? ring.width / 2 + 40 : ring.width / 2;
  ring.y = x ? ring.height / 2 + 40 : ring.height / 2;

  // Start the spinning animation
  return gsap.to(ring, {
    rotation: "+=360", // Full continuous spin
    duration: duration, // Duration per full spin
    repeat: -1, // Infinite loop for continuous spinning
    ease: "none", // Linear ease for constant speed
  });
};

// Helper to convert degrees to radians
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

// Function to stop the spinning with deceleration (always clockwise)

const stopSpinning = (
  ring,
  targetRotationDegrees,
  spinAnimation,
  fullRotations = 2
) => {
  // Kill the infinite animation
  if (spinAnimation) {
    spinAnimation.kill();
  }

  // Convert target rotation to radians
  const targetRotationRadians = degreesToRadians(targetRotationDegrees);

  // Get the current rotation in radians
  const currentRotationRadians = ring.rotation;

  // Normalize current rotation to a 360-degree system (radians)
  const normalizedCurrentRotation = currentRotationRadians % (2 * Math.PI);

  // Calculate how much we need to rotate to reach the target, including full rotations
  let deltaRotation = targetRotationRadians - normalizedCurrentRotation;

  // Add the number of full rotations you want before stopping (fullRotations parameter allows flexibility)
  const totalRotation = deltaRotation + 2 * Math.PI * fullRotations;

  // Apply deceleration animation to stop the spin
  gsap.to(ring, {
    rotation: `+=${totalRotation}`, // Rotate by the calculated total including full rotations
    duration: 3, // Deceleration duration
    ease: "power4.out", // Smooth deceleration
    onComplete: () => {
      console.log("Spin stopped at the correct result!");
    },
  });
};

const PixiNewApp = () => {
  const { socket, currentWallet, setCurrentWallet, userId } =
    useSocketContext();
  const pixiRef = useRef(null);
  const balanceTextRef = useRef(null);

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
    let Pin;

    let ring1SpinAnimation;
    let ring2SpinAnimation;

    Assets.load(bgCover).then((texture) => {
      gameGroundCover = new Sprite(texture);

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

    Assets.load(board).then((texture) => {
      Ring1 = new Sprite(texture);

      // Set sprite properties like position, size, etc.
      Ring1.width = 280;
      Ring1.height = 280;

      // Add the sprite to the container
      gameRingContainer.addChild(Ring1);
    });

    Assets.load(PinBar).then((texture) => {
      Pin = new Sprite(texture);

      // Set sprite properties like position, size, etc.
      Pin.x = Ring1?.width / 2.15;
      // sprite.y = 10;
      Pin.width = 20;
      Pin.height = 35;

      // Add the sprite to the container
      gameRingContainer.addChild(Pin);
    });

    Assets.load(boardText).then((texture) => {
      Ring2 = new Sprite(texture);

      // Set sprite properties like position, size, etc.
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
        ring1SpinAnimation = startSpinning(Ring1, 1, false);
        ring2SpinAnimation = startSpinning(Ring2, 1, true);

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
            spinButtonResult = { ...spinResult };

            // const targetRotation = 44;
            const targetRotation = elementDegrees[spinResult.spinResult] || 0;

            console.log(
              "targetRotation",
              elementDegrees[spinResult.spinResult]
            );

            // Stop the spinning with deceleration
            stopSpinning(Ring1, targetRotation, ring1SpinAnimation, 6);
            stopSpinning(Ring2, targetRotation, ring2SpinAnimation, 6);

            setTimeout(() => {
              return toast.success("spin off");
            }, 2000);
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

*/
