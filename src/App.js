import './App.css';
import Details from './components/Details/Details';
import React, { useReducer, useRef, useState, useImperativeHandle, useCallback, useDebugValue, useLayoutEffect} from 'react';
import ThemeContext, { themes } from './components/Theme/Theme';
import sun from './images/sun.png';
import moon from './images/moon.png';
import useLocalStorage from '../src/customHooks/useLocalStorage';
import useUpdateLogger from './customHooks/useUpdateLogger';
import useRandomJoke from './customHooks/useRandomJoke';
import { useEffect } from 'react/cjs/react.development';

const App = () => {
  const [name, setName] = useLocalStorage('name', '');//custom hooks
  const joke = useRandomJoke('random', 'joke');//custom hooks
  const [theme, setTheme] = useState(themes.light);
  const [moreInfo, setMoreInfo] = useState(false);
  const [toggle, setToggle] = useState(true);

  const ref = useRef(null);
  useUpdateLogger(name);//custom

  ////////////////////////
  
  const [callbackCount, setCallbackCount] = useState(0);
  const callbackFunction = useCallback(() => {
    console.log(callbackCount, "callback called"); 
  }, [callbackCount]); 

  ///////////////////////

  const names = 'ryan'

  useDebugValue(name);
  
  useDebugValue(names, (name) => name.toUpperCase());

//////////////////////
// useEffect VS useLayoutEffect

useLayoutEffect(() => {
  document.body.style.backgroundColor = "#000000";
}, [])


////////////////////

  const changeTheme = () => {
    theme === themes.dark
    ? setTheme(themes.light)
    : setTheme(themes.dark)
  };
  
  const handleClick = () => {
    setMoreInfo(prev => !prev);
  }
  
  const handleFocus = () => {
    ref.current.placeholder = 'Оставьте свой комментарий';
    ref.current.style.border = '3px solid black';
  }
  
  const onInputChange = (e) => {
    dispatch({type: 'CURRENT_COMMENT', payload: e.target.value});
  }
  
  const initialState = {
      like: false,
      currentComment: '',
      comments: []
  };
  
  const sendLike = () => {
    dispatch({type: 'SEND_LIKE', payload: true});
  }

  const sendComment = () => {
    dispatch({type: 'SET_COMMENTS', payload: state.currentComment});
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'SEND_LIKE':
        return {
          ...state,
          like: action.payload
        }
        case 'CURRENT_COMMENT':
          return {
            ...state,
            currentComment: action.payload
        }
        case 'SET_COMMENTS':
          return {
            ...state,
            comments: [...state.comments, action.payload]
          }
        default: 
          return state;
      }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log('state', state);

    return (
      <ThemeContext.Provider value={theme}>
        <button onClick={handleClick}>More info</button>
        <img src={theme === themes.light ? moon : sun} onClick={changeTheme} alt='sun' />
        <Details handleClick={handleClick} moreInfo={moreInfo} setMoreInfo={setMoreInfo} toggle={toggle} setToggle={setToggle} />
        <input ref={ref} onChange={onInputChange} />
        <button onClick={handleFocus}>Focus</button>
        <button onClick={sendComment}>Send Comment</button>
        <button onClick={sendLike}>Like</button>
        {state.like ? <p>Thank you for like</p> : <></>}
        {state.comments.map((item) =>
            <p key={item.index}>{item}</p>
        )}
        <>
          <p className="quotes"> Generate Joke of the day</p>
          <p>{joke}</p>        
        </>
        <>    
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
          <button onClick={() => setCallbackCount(callbackCount + 1)}>+</button>   
          <button onClick={callbackFunction}>   
            Change callback count
          </button>    
        </> 
    </ThemeContext.Provider>
  );
}

export default App;

/// useImperativeHandle, useLayoutEffect, useDebugValue hooks 

// useImperativeHandle(ref, createHandle, [deps])

// const [value, setValue] = useState("");
// const [error, setError] = useState("");
// const onChange =(e) => {
//   setError("");
//   setValue(e.target.value);
// }

// useImperativeHandle(ref, () => ({
//   value: value,
//     onBlur = () => {
//     ref.current.blur()
//   },
//   clear: () => {
//     setValue("")
//     setError("")
//   },
//   setError: setError
// }))

// //useLayoutEffect VS useEffect


// const Component = () => {
//   const [value, setValue] = useState(0);

//   useEffect(() => {     //useLayoutEffect
//     if (value === 0) {
//       setValue(Math.random() * 99 + 99);
//     }
//   }, [value]);

//   console.log("render", value);
//   return <div onClick={() => setValue(0)}>value: {value}</div>;
// };







