import * as React from 'react';
import ReactDOM from 'react-dom';
// import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(228, 135, 85)',
        },
        secondary: {
            main: 'rgb(224, 230, 173)',
        },
        light: {
            main: 'rgb(240, 238, 195)'
        }
    },
});

theme = createTheme(theme, {
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.primary.main})`
                }
            }
        }
    }
});
