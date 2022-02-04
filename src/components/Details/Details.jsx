import React, { useContext, useEffect, useMemo, useState } from "react";
import ThemeContext from "../Theme/Theme";
import burger1 from '../../images/burger1.jpg';
import burger2 from '../../images/burger2.jpg';
import './Detail.css';

const sum = (n) => {
    console.log(n);
    return n + n;
}

const Details = ({moreInfo, setMoreInfo, toggle, setToggle}) => {
    const theme = useContext(ThemeContext);
    const [burgers, setBurgers] = useState([]);
    const [num, setNum] = useState(0);
    const [burger, setBurgerImage] = useState(false);
    
    // const countSum = sum(num);

    const [update, setUpdate] = useState(100);
    console.log(update);

    const updateCounter = () => {
        setUpdate(update - 1)
    }
    
    useEffect(() => {
        console.log('Update');
    },[update])
    
    const countSum = useMemo(() => sum(num), [num]);

    const api = async () => {
        const data = await fetch('http://localhost:3000/db.json')
        const result = await data.json();
        setBurgers(result.burgers);
        return result;
    }

    useEffect(() => {
        return () => {
            console.log('component will unmount');
            setToggle(false);
        }
    },[toggle]);
    
    useEffect(() => {
        console.log('mount, useEffect')
        api();
    },[]);

    // useLayoutEffect(() => {
    //     console.log('mount, useLayoutEffect')
    //     api();
    // });

    useEffect(() => {
        setMoreInfo();
    },[burgers]);

    return (
        <div className='main' style={theme}>
            <div>
                <button onClick={() => setToggle(false)}>Close Menu</button>
                {toggle
                ? <div>
                    <p style={{backgroundColor: 'red', width: '2    00px'}}>Название всех бургеров</p>
                    {burgers.map((item) => 
                        <p key={item.id}>{item.name}</p>
                    )}
                </div>
                :
                <></>
                }
            </div>
            <div className='burgerImageWrapper'>
                <img src={burger ? burger1 : burger2} alt='burger' className='burgerImage' onClick={() => setBurgerImage(!burger)} />
                <div className='burgerCounter'>
                    <p>{countSum}</p>
                    <button style={{height: '20px'}} onClick={() => setNum(num + 1)}>+</button>
                </div>
            </div>
            <div className='flexWrapper'>
            {burgers.map((item) => 
                <div key={item.id} className='wrapper' style={{borderColor: 'theme.borderColor'}}>
                    <img key={item.id} className='detail' src={item.imageUrl} alt=""  />
                    {moreInfo && 
                        <p key={item.id}>{item.name}</p>
                }
            </div>
            )}
            </div>
            <p>componentDidUpdate example: {update}</p>
            <button onClick={updateCounter}>-</button>
        </div>
    )
}

export default Details;