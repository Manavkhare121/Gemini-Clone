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
//   const delayPara=(index,nextWord)=>{
//     setTimeout(function(){
//         setResultData(prev=>prev+nextWord);
//     },75*index)
//   }

//   const onSent = async (prompt) => {
//     try {
//         setResultData("");
//       setLoading(true);
//       setShowResult(true);
//       let response;
//       if(prompt!== undefined){
//         response=await generate(prompt)
//         setRecentPrompt(prompt)
//       }else{
//         setPrevPrompts(prev=>[...prev,input])
//         setRecentPrompt(input)
//         response=await generate(input)
//       }
//       const text = await generate(input);  // collect full generated text here
//       let responseArray=text.split("**");
//       let newResponse="";
//       for(let i=0;i<responseArray.length;i++){
//         if(i===0 || i%2!==1){
//             newResponse+=responseArray[i];

//         }else{
//             newResponse+="<b>"+responseArray[i]+"</b>";
//         }
//       }
//       let newResponse2=newResponse.split("*").join("</br>")
//       let newResponseArray=newResponse2.split(" ");
//       for(let i=0;i<newResponseArray.length;i++){
//         const nextWord=newResponseArray[i];
//         delayPara(i,nextWord+" ")
//       }
      
//       setLoading(false)
//       setInput("")
//       setRecentPrompt(input);
//       setPrevPrompts(prev => [ input,...prev]);
//       setShowResult(true);
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
const newChat=()=>{
    setLoading(false)
    setShowResult(false)
}
const onSent = async (prompt) => {
  try {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const actualPrompt = prompt || input;

    // Only add to recent if not coming from history
    if (!prompt) {
      setPrevPrompts(prev => [actualPrompt, ...prev]);
    }

    setRecentPrompt(actualPrompt);

    const text = await generate(actualPrompt); // Always use actualPrompt

    // Formatting response
    let responseArray = text.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      newResponse += (i % 2 === 1)
        ? `<b>${responseArray[i]}</b>`
        : responseArray[i];
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    // Simulated typing effect
    newResponseArray.forEach((nextWord, i) => {
      setTimeout(() => {
        setResultData(prev => prev + nextWord + " ");
      }, 75 * i);
    });

    setInput(""); // Clear input AFTER sending
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
    newChat
  };

  return <context.Provider value={contextValue}>{props.children}</context.Provider>;
};

export default ContextProvider;
