import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => {
        prev.pop();
        prev.push(mode);
        return [...prev];
      })
    } else {
      setMode(newMode);
      setHistory((prev) => {
        return [...prev, newMode]
      })
    }
  }

  const back = () => {
    if (history.length > 1) {
      const output = [...history];
      output.pop();
      setMode(output[output.length - 1]);
      setHistory(output);
    }
  }

  return {mode, transition, back};

}


