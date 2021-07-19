import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ViewQuilt as ViewQuiltIcon,
  ArrowBack as ArrowBackIcon,
  AddCircle as AddCircleIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import { getDictionary } from '../../redux/DictionaryRedux';
import { getAuth } from '../../redux/AuthRedux';
function Sidebar({ location }: { location: any }) {
  const dic = useSelector((state: any) => getDictionary(state.dictionary));
  const auth = useSelector((state: any) => getAuth(state.AuthRedux));

  var classes = useStyles() as any;
  var theme = useTheme() as any;

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);
  let structure = [
  
    {
      id: 1,
      type: "divider",
      link: "",
      showMenu: true
    },
    {
      id: 2, type: "title",
      label: "فاکتورها",
      link: "",
      showMenu: true
    },
    {
      id: 3,
      label:"فاکتور",
      showMenu: true,
      link: "/app/factor",
      icon: <ViewQuiltIcon />,
      
    },
    {
      id: 4,
      label:"محصول جدید",
      showMenu: true,
      link: "/app/factor/create",
      icon: <AddCircleIcon />,
      
    },
   
  ];
  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link: any) => (
          <SidebarLink
            key={link.id}
            showMenu={link.showMenu ? true : false}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
