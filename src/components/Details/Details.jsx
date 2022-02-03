import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import ThemeContext from "../Theme/Theme";
import burger1 from '../../images/burger1.jpg';
import burger2 from '../../images/burger2.jpg';
import './Detail.css';

const sum = (n) => {
    console.log(n);
    return n + n;
}

const Details = ({moreInfo, setMoreInfo}) => {
    const [burgers, setBurgers] = useState([]);
    const theme = useContext(ThemeContext);

    const [num, setNum] = useState(0);

    const [burger, setBurgerImage] = useState(false);

    // const countSum = sum(num);
    const countSum = useMemo(() => sum(num), [num]);

    const api = async () => {
        const data = await fetch('http://localhost:3000/db.json')
        const result = await data.json();
        setBurgers(result.burgers);
        return result;
    }

    useEffect(() => {
        console.log('mount')
        api();
    },[]);

    // useLayoutEffect(() => {
    //     console.log('mount')
    //     api();
    // });

    useEffect(() => {
        setMoreInfo();
    },[burgers]);

    return (
        <div className='main' style={theme}>
            <div className='burgerImageWrapper'>
                <img src={burger ? burger1 : burger2} alt='burger' className='burgerImage' onClick={() => setBurgerImage(!burger)} />
                <div className='burgerCounter'>
                    <p>{countSum}</p>
                    <button style={{height: '20px'}} onClick={() => setNum(num + 1)}>+</button>
                </div>
            </div>
            <div className='flexWrapper'>
            {burgers.map((item) => 
            <div className='wrapper' style={{borderColor: 'theme.borderColor'}}>
                <img key={item.id} className='detail' src={item.imageUrl} alt=""  />
                {moreInfo && 
                        <p key={item.index}>{item.name}</p>
                }
            </div>
            )}
            </div>
        </div>
    )
}

export default Details;