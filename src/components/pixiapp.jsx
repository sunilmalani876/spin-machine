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
