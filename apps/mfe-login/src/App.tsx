import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-red-400">Este aqui é o MFE Login Remote</h1>
      <Login />
    </>
  );
}

export default App;
