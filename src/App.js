import './App.css';
import Details from './components/Details/Details';
import React, { useReducer, useRef, useState } from 'react';
import ThemeContext, { themes } from './components/Theme/Theme';
import sun from './images/sun.png';
import moon from './images/moon.png';

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const [moreInfo, setMoreInfo] = useState(false);
  const ref = useRef(null);
  
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
    ref.current.style.border = '3px solid black'
  }
  
  const onInputChange = (e) => {
    console.log(e.target.value);
  }
  
  const sendComment = () => {
    dispatch({type: 'ADD_COMMENT', payload: {currentComment: '', like: true}});
  }

  const sendLike = () => {
    dispatch({type: 'SEND_LIKE', like: true });
  }
  
  const reducer = (state, action) => {
    switch(action.type){
      case 'ADD_COMMENT': 
        return {
          ...state,
          currentComment: action.payload
        }
      case 'SEND_LIKE':
        return {
          ...state,
          like: action
        }
      default: 
        return state;
    }
  }
  const [data, dispatch] = useReducer(reducer, {currentComment: '', like: false});
  // console.log(data.currentComment)
  
  // console.log(data);


  return (
    <ThemeContext.Provider value={theme}>
        <button onClick={handleClick}>More info</button>
        <img src={theme === themes.light ? moon : sun} onClick={changeTheme} alt='sun' />
        <Details handleClick={handleClick} moreInfo={moreInfo} setMoreInfo={setMoreInfo} />
        <input ref={ref} onChange={onInputChange} />
        <button onClick={handleFocus}>Focus</button>
        <button onClick={sendComment}>Send comment</button>
        <button onClick={sendLike}>Like</button>
        {data.currentComment ? <p>{data.currentComment}</p> : <></>}
        {data.like ? <p>Thank you for like</p> : <p>Click like</p>}
    </ThemeContext.Provider>
  );
}

export default App;
