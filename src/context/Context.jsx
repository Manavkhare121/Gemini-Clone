// context.js
import { createContext, useState } from "react";
import { generate } from "../cofig/gemini.js"; // Make sure the path is correct

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prePrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async () => {
    try {
        setResultData("");
      setLoading(true);
      setShowResult(true);
      const text = await generate(input);  // collect full generated text here
      setResultData(text);
      setLoading(false)
      setInput("")
      setRecentPrompt(input);
      setPrevPrompts((prev) => [input, ...prev]);
      setShowResult(true);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prePrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return <context.Provider value={contextValue}>{props.children}</context.Provider>;
};

export default ContextProvider;
