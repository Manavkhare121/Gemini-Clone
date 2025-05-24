import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} />
      </div>
      <div className="main-container">
        {!showResult
        ?<>
         <div className="greet">
          <p>
            <span>Hello,Dev.</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on a upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstrom from bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
        </div>
        </>:<div className="Result">
            <div className="title">
                <img src={assets.user_icon}/>
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon}/>
               {
                loading?<div className="loading">
                    <hr />
                    <hr />
                    <hr />
                    </div>: <p dangerouslySetInnerHTML={{__html:resultData}}></p>
               }
            </div>
            
        </div>
        
        }
       
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
            />
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              <img
                onClick={!loading ? () => onSent() : null}
                src={assets.send_icon}
                style={{
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.Your privacy and Gemini Apps
          </p>
           {/* {showResult && (
            <div className="result-box">
              <h3>Response to: "{recentPrompt}"</h3>
              <p>{resultData}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Main;
