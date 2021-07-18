import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Inspired by the former Facebook spinners.
const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        color: '#1a90ff',
        margin: '0 auto',
        animationDuration: '550ms',
        position:'fixed',
        top:'50%',
        left:'50%',
       // transform:'translate(-50%,-50%)'
    },

    circle: {
        strokeLinecap: 'round',
    },
}));
export default function Loader(props:any) {
    const classes = useStyles();
  
    return <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.root}
        classes={{
            circle: classes.circle,
        }}
        size={40}
        thickness={4}
    />
}