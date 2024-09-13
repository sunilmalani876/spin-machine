import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";
import React, { useEffect, useRef } from "react";
import BgCover from "../assets/bgCover1.png";
import board from "../assets/board.png";
import boardText from "../assets/boardText.png";
import PinBar from "../assets/pinBar.png";
import ButtonBase from "../assets/buttonButtom.png";
import ButtonTop from "../assets/spinButtonTop.png";
import ButtonPress from "../assets/spinButtonPress.png";
import makeSpriteButton from "../utils/button";
import gsap from "gsap";
import { useSocketContext } from "../context/socketContext";
import { toast } from "sonner";

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

const startSpinning = (ring, duration, width, height) => {
  gsap.killTweensOf(ring); // Kill any ongoing tweens for this object

  ring.anchor.set(0.5); // Ensure it's rotating around the center

  // Reset the rotation before starting a new spin
  ring.rotation = 0;
  ring.x = ring.parent.width / 2; // Center horizontally within its parent
  ring.y = ring.parent.height / 2; // Center vertically within its parent

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
  fullRotations = 2,
  spinResult
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

      if (spinResult) {
        toast.success(
          `Spin Result: '${spinResult.spinResult}' | ${spinResult.payout}`,
          {
            style: {
              border: "6px solid #99f0d0",
              boxShadow:
                "inset 6px 8px 2px rgb(86 139 219), 6px 8px 0px rgb(87 139 219)",
              // background: "#56c0db",
              // color: "white",
            },
          }
        );
      }
    },
  });
};

const Home = () => {
  const { socket, userId } = useSocketContext();

  const pixiRef = useRef();
  const appRef = useRef(); // Store PIXI Application instance

  useEffect(() => {
    // Initialize PIXI application
    const app = new Application({
      backgroundColor: 0xfca5a5,
      autoDensity: true,
      resizeTo: window, // Automatically resize to window size
    });

    if (pixiRef.current) {
      pixiRef.current.appendChild(app.view);
    }

    const container = new Container();
    app.stage.addChild(container);

    const SpinButtonContainer = new Container();

    let gameGroundCover;
    let ring1;
    let BoardText;
    let Pin;
    let SpinButtonBase;
    let SpinButtonTop;
    let SpinButtonPressed;
    let ring1SpinAnimation;
    let ring2SpinAnimation;

    // Load assets in sequence to ensure correct layering
    const loadAssets = async () => {
      // Load BgCover and add it to the container
      const bgTexture = await Assets.load(BgCover);
      gameGroundCover = new Sprite(bgTexture);
      gameGroundCover.width = app.view?.width;
      gameGroundCover.height = app.view?.height;
      container.addChild(gameGroundCover);

      // Load board and add it to the container after BgCover
      const boardTexture = await Assets.load(board);
      ring1 = new Sprite(boardTexture);
      ring1.width = 280;
      ring1.height = 280;
      ring1.x = app.view?.width / 2 - ring1.width / 2; // Center horizontally
      ring1.y = app.view?.height / 2 - ring1.height / 2; // Center vertically
      container.addChild(ring1);

      const Text = await Assets.load(boardText);
      BoardText = new Sprite(Text);
      BoardText.width = 200;
      BoardText.height = 200;
      BoardText.x = app.view?.width / 2 - BoardText.width / 2; // Center horizontally
      BoardText.y = app.view?.height / 2 - BoardText.height / 2; // Center vertically
      container.addChild(BoardText);

      const BoardPin = await Assets.load(PinBar);
      Pin = new Sprite(BoardPin);
      Pin.width = 20;
      Pin.height = 35;
      Pin.x = app.view?.width / 2 - Pin.width / 2; // Center horizontally
      Pin.y = ring1?.height / 2 + 10; // Center vertically
      container.addChild(Pin);

      container.addChild(SpinButtonContainer);

      const spinButtonBase = await Assets.load(ButtonBase);
      SpinButtonBase = new Sprite(spinButtonBase);
      SpinButtonBase.width = 110;
      SpinButtonBase.height = 85;
      SpinButtonBase.x = app.view?.width / 2 - SpinButtonBase.width / 2; // Center horizontally
      SpinButtonBase.y = app.view?.height / 2 + 145; // Center vertically
      SpinButtonContainer.addChild(SpinButtonBase);

      const spinButtonTop = await Assets.load(ButtonTop);
      SpinButtonTop = new Sprite(spinButtonTop);
      SpinButtonTop.width = 90;
      SpinButtonTop.height = 60;
      SpinButtonTop.x = app.view?.width / 2 - SpinButtonTop.width / 2; // Center horizontally
      SpinButtonTop.y = app.view?.height / 2 + 145; // Center vertically
      SpinButtonContainer.addChild(SpinButtonTop);

      const spinButtonPress = await Assets.load(ButtonPress);
      SpinButtonPressed = new Sprite(spinButtonPress);
      SpinButtonPressed.width = 90;
      SpinButtonPressed.height = 60;
      SpinButtonPressed.visible = false;
      SpinButtonPressed.x = app.view?.width / 2 - SpinButtonPressed.width / 2; // Center horizontally
      SpinButtonPressed.y = app.view?.height / 2 + 145; // Center vertically
      SpinButtonContainer.addChild(SpinButtonPressed);

      makeSpriteButton(SpinButtonTop, () => {
        console.log("Spin button clicked!");
        SpinButtonPressed.visible = true;

        ring1SpinAnimation = startSpinning(ring1, 1);
        ring2SpinAnimation = startSpinning(BoardText, 1);

        socket?.emit("spin", {
          userId,
        });

        socket?.on("spinResult", (Result) => {
          console.log("Result", Result);

          const targetRotation = elementDegrees[Result.spinResult] || 0;

          stopSpinning(ring1, targetRotation, ring1SpinAnimation, 6);
          stopSpinning(
            BoardText,
            targetRotation,
            ring2SpinAnimation,
            6,
            Result
          );
        });
      });
    };

    loadAssets();

    // Responsive resize logic for elements
    const resizeElements = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Resize gameGroundCover
      if (gameGroundCover) {
        gameGroundCover.width = width;
        gameGroundCover.height = height;
      }

      // Resize Ring1
      // const ring1 = container.getChildByName("ring1");
      if (ring1) {
        ring1.x = width / 2 - ring1.width / 2; // Center horizontally
        ring1.y = height / 2 - ring1.height / 2; // Center vertically
      }

      if (BoardText) {
        BoardText.x = width / 2 - BoardText.width / 2;
        BoardText.y = height / 2 - BoardText.height / 2;
      }

      if (Pin) {
        Pin.x = width / 2 - Pin?.width / 2;
        // Pin.y = height / 2 + 10;
      }

      // Resize SpinButtonBase and SpinButtonTop
      if (SpinButtonBase) {
        SpinButtonBase.x = width / 2 - SpinButtonBase.width / 2;
        SpinButtonBase.y = height / 2 + 145;
      }
      if (SpinButtonTop) {
        SpinButtonTop.x = width / 2 - SpinButtonTop.width / 2;
        SpinButtonTop.y = height / 2 + 145;
      }
    };

    // Listen to window resize event
    window.addEventListener("resize", resizeElements);

    // Initial resize call
    resizeElements();

    // Store the PIXI Application in a ref to avoid recreating
    appRef.current = app;

    return () => {
      app.destroy(true, true); // Cleanup PIXI application on unmount
      window.removeEventListener("resize", resizeElements); // Cleanup resize listener
    };
  }, [socket]);

  return <div ref={pixiRef} style={{ width: "100%", height: "100%" }} />;
};

export default Home;
