# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!--


https://stackblitz.com/edit/vitejs-vite-jxkcix?file=src%2FApp.tsx






<--

// const PixiNewApp = () => {
//   // Create PIXI app instance
//   const app = new PIXI.Application({
//     background: "#fca5a5",
//     resizeTo: window,
//     autoDensity: true,
//   });

//   const container = new PIXI.Container();
//   app.stage.addChild(container);

//   const { socket } = useSocketContext(); // Access the socket

//   // Adjust background size when window resizes
//   function adjustBackgroundSize(container, app) {
//     // console.log("change");
//     const bg = container.children.find(
//       (child) =>
//         child.texture && child.texture.baseTexture.resource.url === BaseBG
//     );
//     if (bg) {
//       bg.width = app.view.width;
//       bg.height = app.view.height;
//     }
//   }

//   // Handle window resize to adjust background size
//   const onResize = () => {
//     adjustBackgroundSize(container, app);
//   };

//   window.addEventListener("resize", onResize);

//   // Initial resize adjustment
//   onResize();

//   // TEXT FOR BALANCE AND WALLET

//   // TEXT FOR BALANCE AND WALLET
//   const textStyle = {
//     fontFamily: "Arial",
//     fontSize: 24,
//     fill: 0xffffff, // White color
//     align: "center",
//   };

//   const balance = new PIXI.Text("$ Balance", textStyle);

//   const wallet = new PIXI.Text("Bet Amount", textStyle);

//   const balanceText = new PIXI.Text("$ 234", textStyle);

//   const walletText = new PIXI.Text("$ 0", textStyle);

//   // Position the text in the center of the canvas
//   //   balance.y = app.view.height / 2 - balance.height / 2;

//   // Add the text to the container
//   balance.x = app.view.width / 2 - balance.width / 2 - 100;
//   wallet.x = app.view.width / 2 - balance.width / 2 + 100;
//   balanceText.x = app.view.width / 2 - balance.width / 2 - 70;
//   balanceText.y = 35;
//   walletText.x = app.view.width / 2 - balance.width / 2 + 130;
//   walletText.y = 35;

//   container.addChild(balance);
//   container.addChild(wallet);
//   container.addChild(walletText);
//   container.addChild(balanceText);

//   // Container FOR SELECTING AN ELEMENT
//   const characters = ["A", "B", "C", "D", "E", "F", "G", "H"];

//   //
//   // Container FOR SELECTING AN ELEMENT
//   // SELECTING ELEMENT
//   //
//   const elementContainer = new PIXI.Container();
//   elementContainer.x = app.view.width / 2 - 150;
//   elementContainer.y = 200;
//   app.stage.addChild(elementContainer);

//   //
//   // Container FOR SETTING A BET
//   // SET BET AMOUNT ELEMENT
//   //
//   const betingContainer = new PIXI.Container();
//   betingContainer.x = app.view.width / 2 - 150;
//   betingContainer.y = 200; // Position it as needed
//   betingContainer.visible = false; // Initially hidden
//   app.stage.addChild(betingContainer);

//   let spinBetAmount = 0;

//   // This will store the currently active button
//   let activeButton = null;
//   let confirmButton = null; // This will store the confirm button

//   // CREATE BUTTON FUNCTION
//   const createButton = (text, container, x, y, onClick) => {
//     const button = new PIXI.Text(text, { ...textStyle, fill: "white" });
//     button.interactive = true;
//     button.buttonMode = true;
//     button.anchor.set(0.5);
//     button.position.set(x, y);
//     button.on("pointerdown", onClick);
//     container.addChild(button);
//     return button;
//   };

//   // CREATE CONFIRM_BUTTON FUNCTION
//   const createConfirmButton = (container, x, y, onConfirm) => {
//     const button = new PIXI.Text("Confirm", { ...textStyle, fill: "green" });
//     button.interactive = true;
//     button.buttonMode = true;
//     button.anchor.set(0.5);
//     button.position.set(x, y); // Position confirm button as desired
//     button.visible = false; // Initially hidden
//     button.on("pointerdown", onConfirm);
//     container.addChild(button);
//     return button;
//   };

//   const confirmX = 3 * 40 + 25;
//   const confirmY = 100;

//   // CONFIRM BUTTON AFTER SELECTING ELEMENT
//   confirmButton = createConfirmButton(
//     elementContainer,
//     confirmX,
//     confirmY,
//     function () {
//       // Hide all characters
//       elementContainer.children.forEach((child) => {
//         child.visible = false;
//       });

//       // Hide the confirm button
//       confirmButton.visible = false;
//       betingContainer.visible = true; // Make the betting container visible

//       // Show bet amount component (you would implement your bet amount component here)
//       // showBetAmountComponent();

//       console.log("Closed");
//     }
//   );

//   const heading = new PIXI.Text("Plaese, Select an element", textStyle);
//   heading.x = 25;
//   elementContainer.addChild(heading);
//   // LOOP FOR CHARACTER ARRAY ELEMENT
//   characters.map((char, index) => {
//     const xPosition = index * 40 + 25;

//     const button = createButton(
//       char,
//       elementContainer,
//       xPosition,
//       50,
//       function () {
//         console.log(char);

//         // SET WHICH ONE IS ACTIVE BUTTONE
//         if (activeButton && activeButton !== button) {
//           activeButton.style.fill = "white";
//         }

//         button.style.fill = "black";
//         confirmButton.visible = true;
//         activeButton = button;
//       }
//     );
//   });

//   // BETTING SET-UP
//   const betingHeading = new PIXI.Text("Plaese, Set bet amount...", textStyle);
//   heading.x = 25;
//   betingContainer.addChild(betingHeading);

//   // INCREAMENT OR DECREASEMENT BET AMOUNT
//   const increamentBet = createButton(
//     "+ 10",
//     betingContainer,
//     betingContainer.x - 250,
//     45,
//     function () {
//       console.log("Increment amount");
//       // spinBetAmount = spinBetAmount + 10;
//       spinBetAmount += 10;
//       betAmount.text = `$ ${spinBetAmount}`;
//     }
//   );

//   const betAmount = new PIXI.Text(`$ ${spinBetAmount}`, textStyle);
//   betAmount.x = betingContainer.width / 2 - 20;
//   betAmount.y = 35;

//   betingContainer.addChild(betAmount);

//   const decreamentBet = createButton(
//     "- 10",
//     betingContainer,
//     app.view.width / 2 - 220,
//     45,
//     function () {
//       if (spinBetAmount === 0) return;
//       console.log("Decrement amount");
//       spinBetAmount -= 10;
//       betAmount.text = `$ ${spinBetAmount}`; // Update the bet amount text
//     }
//   );

//   const SpinneButton = createButton(
//     "Spin",
//     betingContainer,
//     app.view.width / 2 / 2 - 85,
//     85,
//     function () {
//       if (spinBetAmount === 0) return;
//       console.log("Decrement amount");
//       spinBetAmount -= 10;
//       betAmount.text = `$ ${spinBetAmount}`; // Update the bet amount text
//     }
//   );

//   // Return the PIXI application instance
//   return app;
// };


 -->
