import { useCallback, useContext, useState } from "react";
import "./Sidebar.css";
import { TiThMenu } from "react-icons/ti";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosHelpCircle } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [slideMenu, setSlideMenu] = useState(true);
  const{onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context)
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <div className="top-entry">
            <TiThMenu
              onClick={() => setSlideMenu((prev) => !prev)}
              className="icon menu"
            />
          </div>
          <div onClick={()=>newChat()} className="new-chat">
              <FiPlus className="icon" />
              {slideMenu ? <p>New Chat</p> : null}
            </div>

          {slideMenu ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.map((item,index)=>{
                return (<div onClick={()=>loadPrompt(item)} className="recent-entry">
                <AiOutlineMessage className="icon" />
                <p>{item.slice(0,18)}...</p>
              </div>)
              })}
              
            </div>
          ) : null}
        </div>
        <div className="bottom">
         
          <div className="bottom-item recent-entry">
            <IoIosHelpCircle className="icon" />
            {slideMenu ? <p>Help</p> : null}
          </div>
          
          <div className="bottom-item recent-entry">
            <RiHistoryLine className="icon" />
            {slideMenu ? <p>Activity</p> : null}
          </div>
          
          <div className="bottom-item recent-entry">
            <IoSettings className="icon" />
            {slideMenu ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
