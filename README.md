# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!--


https://stackblitz.com/edit/vitejs-vite-jxkcix?file=src%2FApp.tsx






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












    <Container
        x={dimensions.width / 2} // Center horizontally
        y={dimensions.height / 2}
        style={{
          position: "flex",
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <Text
          text="Select a element"
          style={textStyle}
          // width={(dimensions.width / 2) * 1.5}
          // height={(dimensions.width / 2) * 1.5}
          anchor={0.5} // Center the text based on its position
        />
        <Text
          text="On which you want to set a bet."
          style={textStyle}
          y={30}
          anchor={0.5} // Center the text based on its position
        />
      </Container> -->
