import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

export default function Error() {
  var classes = useStyles();
 
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <img className={classes.logotypeIcon} src={logo} alt="logo" />
        <Typography variant="h3" color="textPrimary" className={classes.logotypeText}>
          شرکت اهورا
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
          color="primary"
          className={classnames(classes.textRow, classes.errorCode)}
        >
          404
        </Typography>
        <Typography variant="h5" color="primary" className={classes.textRow}>
          صفحه یافت نشد
        </Typography>
        <Typography
          variant="h6"
         
          color="secondary"
          className={classnames(classes.textRow, classes.safetyText)}
        >
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
          className={classes.backButton}
        >
         بازگشت 
        </Button>
      </Paper>
    </Grid>
  );
}
