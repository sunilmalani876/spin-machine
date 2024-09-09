import * as PIXI from "pixi.js";
import gsap from "gsap";
import BaseBG from "./assets/canvas.png";
import planeImage from "./assets/plane.png";
import WheelBack from "./assets/PlaneWheel1.png";
import WheelFront from "./assets/PlaneWheel2.png";
import FireImage from "./assets/Fire1.png";
import FireFramesData from "./json/Fire1.json";

const PixiApp = (containerElement) => {
  // Create PIXI app instance
  const app = new PIXI.Application({
    background: "#0F0E33",
    resizeTo: window,
    autoDensity: true,
  });

  // Append PIXI view to the provided container element
  // containerElement.appendChild(app.view);

  // Load fire textures from the JSON data
  const fireTextures = loadTextures();

  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Create the background, plane, and fire animation
  createBackground(container, app);
  const plane = createPlane(container);
  createFireAnimation(plane, fireTextures);

  // Handle window resize to adjust background size
  const onResize = () => {
    adjustBackgroundSize(container, app);
  };
  window.addEventListener("resize", onResize);

  // Cleanup function to destroy the PIXI app and animations
  const cleanup = () => {
    window.removeEventListener("resize", onResize);
    app.destroy(true, { children: true });
    gsap.killTweensOf(plane);
  };

  // Event listener for Play and Reset buttons
  document.getElementById("playButton").addEventListener("click", () => {
    animatePlane(plane, onAnimationComplete);
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    resetPlane(plane);
  });

  // Utility functions

  // Load textures for fire animation from JSON
  function loadTextures() {
    const baseTexture = PIXI.BaseTexture.from(FireImage);
    const textures = [];

    Object.keys(FireFramesData.frames).forEach((frameName) => {
      const { frame } = FireFramesData.frames[frameName];
      const rectangle = new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h);
      const texture = new PIXI.Texture(baseTexture, rectangle);
      textures.push(texture);
    });

    return textures;
  }

  // Adjust background size when window resizes
  function adjustBackgroundSize(container, app) {
    const bg = container.children.find(
      (child) =>
        child.texture && child.texture.baseTexture.resource.url === BaseBG
    );
    if (bg) {
      bg.width = app.view.width;
      bg.height = app.view.height;
    }
  }

  // Create background sprite and add it to the container
  function createBackground(container, app) {
    const bg = PIXI.Sprite.from(BaseBG);
    bg.width = app.view.width;
    bg.height = app.view.height;
    container.addChild(bg);
  }

  // Create plane sprite with wheels
  function createPlane(container) {
    const plane = new PIXI.Sprite(PIXI.Texture.from(planeImage));
    plane.x = 100;
    plane.y = 600;
    plane.scale.set(1.5);

    const wheelBack = new PIXI.Sprite(PIXI.Texture.from(WheelBack));
    wheelBack.x = 20;
    wheelBack.y = 15;
    plane.addChild(wheelBack);

    const wheelFront = new PIXI.Sprite(PIXI.Texture.from(WheelFront));
    wheelFront.x = 60;
    wheelFront.y = 15;
    plane.addChild(wheelFront);

    container.addChild(plane);

    return plane;
  }

  // Create fire animation using textures
  function createFireAnimation(plane, fireTextures) {
    if (fireTextures.length > 0) {
      const fire = new PIXI.AnimatedSprite(fireTextures);
      fire.x = -30;
      fire.y = 10;
      fire.anchor.set(0.5);
      fire.animationSpeed = 0.5;
      fire.loop = true;
      fire.play();

      plane.addChild(fire);
    }
  }

  // Animate plane using GSAP
  function animatePlane(plane, callback) {
    // First animation: Plane runs on the ground (move horizontally)
    gsap.to(plane, {
      x: 600, // Move horizontally to 600px
      duration: 2, // Duration of 2 seconds
      ease: "power2.out",
    });

    // Second animation: Plane takes off (seamless transition)
    gsap.to(plane, {
      x: 1100, // Continue moving horizontally to 1300px
      y: 100, // Move vertically to 100px (taking off)
      rotation: -30 * (Math.PI / 180), // Tilt the plane by 30 degrees (converted to radians)
      duration: 3, // Duration of take-off animation
      ease: "power2.out",
      delay: 0.5, // Overlap the second animation by starting halfway through the first
      onComplete: () => {
        if (callback) {
          callback("Plane animation completed");
        }
      },
    });
  }

  // Reset plane to its initial position
  function resetPlane(plane) {
    gsap.set(plane, {
      x: 100,
      y: 600,
      rotation: 0, // Reset the tilt
    });
  }

  // Callback for animation completion
  function onAnimationComplete(message) {
    console.log(message);
  }

  // Return the PIXI app instance and cleanup function
  return app;
};

export default PixiApp;
