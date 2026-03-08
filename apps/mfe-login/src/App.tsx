import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="bg-red-400 text-center">MFE Login Remote</p>
      <Login />
    </>
  );
}

export default App;
