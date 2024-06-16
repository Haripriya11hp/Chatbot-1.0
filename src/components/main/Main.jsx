import "./Main.css";
import { assets } from "../../assets/assets";
import { RiUserHeartLine } from "react-icons/ri";
import { FaCompass } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";

function Main() {
  //getting states and function using contextapi
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);

  const paragraphRefs = useRef([]);

  const handleCard = (index) => {
    const paragraphText = paragraphRefs.current[index].textContent;
    onSent(paragraphText)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSent();
    }
  };

  return (
    <>
      <div className="main">
        <div className="nav">
          <div className="heading-text">Gemini</div>
          <RiUserHeartLine className="user-icon" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="welcome">
                <p>
                  <span className="welcome-text">Hello, Buddy.</span>
                </p>
                <p>How can I help you today?</p>
              </div>

              <div className="cards" >
                <div className="card" onClick={() => handleCard(0)}>
                  <p ref={el => paragraphRefs.current[0] = el} className="card-text">
                    Suggest beaches to visit in a city, including details
                  </p>
                  <FaCompass className="card-icon" />
                </div>
                <div className="card" onClick={() => handleCard(1)}>
                  <p ref={el => paragraphRefs.current[1] = el} className="card-text">
                    Ideas to surprise a friend on their birthday
                  </p>
                  <FaLightbulb className="card-icon" />
                </div>
                <div className="card" onClick={() => handleCard(2)}>
                  <p ref={el => paragraphRefs.current[2] = el} className="card-text">
                    Revise my writing and fix my grammar
                  </p>
                  <FaPen className="card-icon" />
                </div>
                <div className="card" onClick={() => handleCard(3)}>
                  <p ref={el => paragraphRefs.current[3] = el} className="card-text">
                    Plan a healthy meal with what's available in my fridge
                  </p>
                  <IoFastFoodSharp className="card-icon" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <RiUserHeartLine className="user-icon" />
                <p className="text-color">{recentPrompt}</p>
              </div>
              <div>
                <div className="result-data">
                  <img className="result-img" src={assets.gemini_icon} alt="" />
                  {/* dangerouslySetInnerHTML with object with html result data, resultData if it is displayed directly it will show tags */}
                  {loading ? (
                    <div className="loader">
                      <hr className="loader-height" />
                      <hr className="loader-height" />
                      <hr className="loader-height" />
                    </div>
                  ) : (
                    <p
                      className="text-color"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    ></p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="search-nav">
            <div className="search-bar">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="input-field"
                placeholder="Enter a prompt here"
                onKeyDown={handleKeyPress}
              />
              <div>
                {input ? (
                  <FaArrowCircleRight
                    onClick={() => onSent()}
                    className="arrow-icon"
                  />
                ) : null}
              </div>
            </div>
            <p className="footer-text">
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
