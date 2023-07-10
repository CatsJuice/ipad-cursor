import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { IpadCursorConfig } from "ipad-cursor";

function App() {
  const config: IpadCursorConfig = {
    blockPadding: "auto",
    blockStyle: {
      radius: "auto",
    },
    enableAutoTextCursor: true,
  };
  useIPadCursor();
  const [count, setCount] = useState(0);

  return (
    <IPadCursorProvider config={config}>
      <a
        className="inline-block rounded-30px"
        data-cursor="block"
        href="https://vitejs.dev"
        target="_blank"
      >
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a
        className="inline-block rounded-30px"
        data-cursor="block"
        href="https://react.dev"
        target="_blank"
      >
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React</h1>
      <div className="card">
        <button data-cursor="block" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </IPadCursorProvider>
  );
}

export default App;
