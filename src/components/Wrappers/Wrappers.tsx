import React from "react";
import {
  withStyles,
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button as ButtonBase,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import classnames from "classnames";

// styles
var useStyles = makeStyles((theme: any) => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

function Badge({ children = null,  colorBrightness = "", color = "",badgeContent=null, ...props }) {
  var classes = useStyles();
  var theme = useTheme();
  var Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    }
  }, {});

  return (
    <Styled>
      {(styledProps: any) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}
interface TypographyProps {
  children?: React.ReactNode,
  weight?: string,
  size?: string,
  colorBrightness?: string,
  color?: string,
  className?: string,
  variant?: any,
  gutterBottom?: any,
  onClick?: any,
  component?: any,
  href?: string,
  style?: any
}
function Typography({
  children,
  weight,
  size,
  colorBrightness,
  color,
  className,
  style,
  ...props
}: TypographyProps) {
  var theme = useTheme();

  return (
    <TypographyBase className={className}
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}
interface IProps {
  children?: React.ReactNode;
  color?: string,
  className?: string,
  select?: any,
  variant?: any,
  colortheme?: any,
  onClick?: any
  // any other props that come into the component
}

function Button({ children, color, className, ...props }: IProps) {
  var theme = useTheme() as any;

  var Styled = createStyled({
    root: {
      color: getColor(color, theme),
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: `${color ? "white" : theme.palette.text.primary} !important`,
      "&:hover": {
        backgroundColor: getColor(color, theme, "light"),
        boxShadow: theme.customShadows.widgetWide,
      },
      "&:active": {
        boxShadow: theme.customShadows.widgetWide,
      },
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
  }, {});

  return (
    <Styled>
      {({ classes }: { classes: any }) => (
        <ButtonBase
          classes={{
            contained: classes.contained,
            root: classes.root,
            outlined: classes.outlined,
          }}
          {...props}
          className={classnames(
            {
              [classes.select]: props.select,
            },
            className,
          )}
        >
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
}

export { Badge, Typography, Button };

// ########################################################################

function getColor(color = "", theme: any, brigtness = "main") {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness];
  }
}

function getFontWeight(style: any) {
  switch (style) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size: any, variant = "", theme: any) {
  var multiplier;

  switch (size) {
    case "sm":
      multiplier = 0.8;
      break;
    case "md":
      multiplier = 1.5;
      break;
    case "xl":
      multiplier = 2;
      break;
    case "xxl":
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  var defaultSize =
    variant && theme.typography[variant]
      ? theme.typography[variant].fontSize
      : theme.typography.fontSize + "px";

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles: any, options: any) {
  var Styled = function (props: any) {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
