import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider
} from "@material-ui/core";
import { MoreVert as MoreIcon, ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import classnames from "classnames";
import { Link } from 'react-router-dom';
// styles
import useStyles from "./styles";
interface IProps {
  children?: any,
  title?: string,
  toolbar?: any,
  noBodyPadding?: any,
  bodyClass?: any,
  disableWidgetMenu?: any,
  header?: any,
  subTitle?: string,
  className?: string,
  upperTitle?: any,
  back?: string,
}
export default function Widget({
  children,
  title,
  subTitle,
  upperTitle,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  toolbar,
  back = "",
  className,
  ...props
}: IProps) {
  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper}>
      
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
       
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
              <React.Fragment>
                <Box className={classes.item}>
                  <Typography variant="h2" color="primary" className={classes.title}>
                    {title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {subTitle}
                  </Typography>
                </Box>
                <Box>
                  {toolbar}
                </Box>
                <Box hidden={!Boolean(back)}>

                  <Link to={back} className={"text-center"}>
                    <Box className="text-black">
                      <ArrowForwardIcon />
                    </Box>
                    <Box className="text-gray">
                      بازگشت
                            </Box>
                  </Link>
                  <Divider flexItem orientation="vertical" className="mx-16" />

                </Box>
                {!disableWidgetMenu && (
                  <IconButton
                    color="primary"
                    classes={{ root: classes.moreButton }}
                    aria-owns="widget-menu"
                    aria-haspopup="true"
                    onClick={() => setMoreMenuOpen(true)}
                    buttonRef={setMoreButtonRef}
                  >
                    <MoreIcon />
                  </IconButton>
                )}
              </React.Fragment>
            )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
