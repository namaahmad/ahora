import React from 'react';
import { Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    input: {
        display:'block',
        width: '100%',
        border:'2px solid dodgerblue',
        borderRadius:20,
        background:"inherits",
        '& .MuiOutlinedInput-inputMarginDense':{
            paddingTop:8.5,
            paddingBottom:8.5
        },
        '& .MuiTextField-root': {
            width: '100%',
            padding: '3px',
            outline: 'none',
            '& fieldset': {
                border: 0,
            },
            '& .icon': {
                color: '#adadad',
                fontSize:'17px'
            }
        }
    }
}));

export default function InputContainer(props:any) {
    const classes = useStyles();
    const {children,...others} = props;
    return (
        <Box className={classes.input} {...props}>
            {children}
        </Box>
    )
}