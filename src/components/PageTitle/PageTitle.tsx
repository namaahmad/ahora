import React from "react";
import { Button } from "@material-ui/core";

// styles
import useStyles from "./styles";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// components
import { Typography } from "../Wrappers/Wrappers";
import { getAuth } from '../../redux/AuthRedux';
export default function PageTitle(props: any) {
  var classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state: any) => getAuth(state.AuthRedux));
  var permissions = [];

  if (auth && auth.user) {
    permissions = auth.user.permission;
  }

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" color="primary" size="sm">
        {props.title}
      </Typography>
      {props.AddNewRecordButton&&permissions.includes(props.AddNewRecordButton.permission) && (
        <Button onClick={() => history.push(props.AddNewRecordButton.link)}
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="primary"
        >
          {props.AddNewRecordButton.title}
        </Button>
      )}
    </div>
  );
}
