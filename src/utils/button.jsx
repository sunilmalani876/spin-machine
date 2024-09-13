const makeSpriteButton = (sprite, onClick) => {
  // Enable interaction and change the cursor to pointer on hover
  sprite.interactive = true;
  sprite.buttonMode = true;

  // Add event listener for click
  sprite.on("pointerdown", () => {
    if (onClick) {
      onClick();
    }
  });

  // Optional: Add hover or other interactions
  //   sprite.on("pointerover", () => {
  //     sprite.scale.set(1.1); // Slightly enlarge on hover
  //   });

  //   sprite.on("pointerout", () => {
  //     sprite.scale.set(0.5); // Reset scale when hover ends
  //   });
};

export default makeSpriteButton;
