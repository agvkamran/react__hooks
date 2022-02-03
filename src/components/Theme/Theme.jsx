import React from 'react';

export const themes = {
    dark: {
        color: 'white',
        borderColor: 'white',
        background: 'black'
    },
    light: {
        color: 'black',
        borderColor: 'black',
        background: 'white'
    }
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;