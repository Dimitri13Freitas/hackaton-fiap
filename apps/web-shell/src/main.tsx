import { createRoot } from "react-dom/client";
import "@repo/ui/src/globals.css";
import { RemoteComponentWrapper } from "./App.tsx";

createRoot(document.getElementById("root")!).render(<RemoteComponentWrapper />);
