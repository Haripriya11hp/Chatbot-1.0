// setting up context api using createContext Hook

import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

//creating contextprovider function
const ContextProvider = (props) => {

//creating state variables to get input from user after generating response we will display in main component
    const[input, setInput] = useState(''); //to save input prompt data
    const[recentPrompt, setRecentPrompt] = useState(''); //when clicked on send, input is saved in recentPrompt
    const[prevPrompt, setPrevPrompt] = useState([]);// array to store input history 
    const[showResult, setShowResult] = useState(false); 
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData]= useState('');

    const paraTyping = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)
        },75*index)
    }
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


     const onSent = async(prompt) => {
        setResultData(" ");// removing previous result
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
     
        let responseArray = response.split("**")
        let newResponse=" ";
        for(let i=0; i< responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponse3 = newResponse2.split("##").join(" ")
        let newResponseArray = newResponse3.split(" ");
        for(let i=0;i<newResponseArray.length;i++)
        {
            const nextWord = newResponseArray[i];
            paraTyping(i,nextWord+" ")
        }
        setLoading(false)
        setInput('')
    }
     

    //contextvalue to access in main and sidebar component
    const contextValue = {
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;