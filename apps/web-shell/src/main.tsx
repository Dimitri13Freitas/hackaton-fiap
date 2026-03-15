import { createRoot } from "react-dom/client";
import "./globals.css";
import { RemoteComponentWrapper } from "./App.tsx";

createRoot(document.getElementById("root")!).render(<RemoteComponentWrapper />);
