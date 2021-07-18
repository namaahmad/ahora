import React, { useState, ReactElement } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";
interface Iprops {
  link: any,
  icon?: any,
  label?: any,
  children?: any,
  location?: any,
  isSidebarOpened?: any,
  nested?: any,
  type?: any,
  showMenu: Boolean
}
export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
  showMenu
}: Iprops) {
  var classes = useStyles() as any;

  // local
  var [isOpen, setIsOpen] = useState(false);
  var isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title")
    return (
      <Typography style={{display: showMenuStyle(showMenu) }}
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider style={{display: showMenuStyle(showMenu) }} className={classes.divider} />;

  if (!children) {
    return <ListItem style={{display: showMenuStyle(showMenu) }}
      button
      component={link && Link}
      to={link}
      className={classes.link}
      classes={{
        root: classnames(classes.linkRoot, {
          [classes.linkActive]: isLinkActive && !nested,
          [classes.linkNested]: nested,
        }),
      }}
      disableRipple
    >
      <ListItemIcon
        className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
        })}
      >
        {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
      </ListItemIcon>
      <ListItemText
        classes={{
          primary: classnames(classes.linkText, {
            [classes.linkTextActive]: isLinkActive,
            [classes.linkTextHidden]: !isSidebarOpened,
          }),
        }}
        primary={label}
      />
    </ListItem>
  }

  return (
    < >
      <ListItem style={{display: showMenuStyle(showMenu) }}
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map((childrenLink: any) => (
              <SidebarLink
                showMenu={childrenLink.showMenu}
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}

    </>
  );

  // ###########################################################

  function toggleCollapse(e: any) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
  function showMenuStyle(isShow: Boolean) {
    var style = "flex";
    if (!isShow)
      style = "none";
    return style;
  }
}
