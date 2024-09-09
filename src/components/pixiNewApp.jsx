import * as PIXI from "pixi.js";

const PixiNewApp = () => {
  // Create PIXI app instance
  const app = new PIXI.Application({
    background: "#fca5a5",
    resizeTo: window,
    autoDensity: true,
  });

  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Adjust background size when window resizes
  function adjustBackgroundSize(container, app) {
    console.log("change");
    const bg = container.children.find(
      (child) =>
        child.texture && child.texture.baseTexture.resource.url === BaseBG
    );
    if (bg) {
      bg.width = app.view.width;
      bg.height = app.view.height;
    }
  }

  // Handle window resize to adjust background size
  const onResize = () => {
    adjustBackgroundSize(container, app);
  };

  window.addEventListener("resize", onResize);

  // Initial resize adjustment
  onResize();

  // Return the PIXI application instance
  return app;
};

export default PixiNewApp;
