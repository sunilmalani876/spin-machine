import React, { useEffect, useRef } from "react";

const options = {
  fontFamily: "Arial",
  fontSize: 24,
  fill: "black",
  align: "center",
};

const usePrimaryButton = ({ options }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Create text object for the label
    const text = new Text({
      text: options?.text || "",
      style: {
        fill: 0x49c8ff,
        fontFamily: "Bungee Regular",
        fontWeight: "bold",
        align: "center",
        fontSize: 40,
        ...options?.textStyle,
      },
    });

    // Create FancyButton instance
    const button = new FancyButton({
      defaultView: "play-btn-up",
      pressedView: "play-btn-down",
      text,
      textOffset: {
        default: { y: -30 },
        pressed: { y: -15 },
      },
      anchorX: 0.5,
      anchorY: 1,
      scale: DEFAULT_SCALE,
      ...options.buttonOptions,
    });

    // Play sound effect on press
    // button.onPress.connect(() => {
    //   sfx.play("audio/primary-button-press.wav");
    // });

    buttonRef.current = button;

    return () => {
      // Cleanup the button when the component is unmounted
      buttonRef.current?.destroy();
    };
  }, [options]);

  return buttonRef;
};

const PrimaryButton = ({ buttonStyle }) => {
  const buttonRef = usePrimaryButton({ options: buttonStyle || options });

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      // Do something with the button instance, like adding it to a PIXI container
      // Example: somePixiContainer.addChild(button);
    }
  }, [buttonRef]);

  return null;
};

export default PrimaryButton;
