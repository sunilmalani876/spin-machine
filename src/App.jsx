import { lazy, Suspense } from "react";
import { Loader } from "./components/pixiapp";
import PixiCanvas from "./components/pixiCanvas";
// import PixiNewApp from "./components/pixiNewApp";

// const PixiCanvas = lazy(() => import("./components/pixiCanvas"));

function App() {
  return <PixiCanvas />;
}

// function Loader() {
//   return (
//     <div className="text-black w-full min-h-screen font-bold text-xl text-center flex justify-center items-center">
//       Loader.....
//     </div>
//   );
// }

// <Suspense fallback={<Loader />}>
{
  /* <PixiApp /> */
}
// </Suspense>

export default App;
