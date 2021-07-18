import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
interface Iprops {
    openDialog: boolean,
    closeModal: Function,
    Title: String,
    Description: String
}
export default function ConfirmDialog(props: Iprops) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (value: boolean) => {
        setOpen(false);
        props.closeModal(value)
    };
    useEffect(() => {
        setOpen(props.openDialog);
    }, [props.openDialog])
    return (

        <Dialog style={{fontSize:"15px"}}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.Title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{fontSize:"15px"}}>
                    {props.Description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={e => handleClose(true)} color="primary" style={{fontSize:"15px"}}>
                    تایید
                </Button>
                <Button onClick={e => handleClose(false)} color="primary" autoFocus style={{fontSize:"15px"}}>
                   انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
}