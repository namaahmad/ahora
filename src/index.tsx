import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { create } from 'jss';
import Themes from "./themes";
import App from "./App";
import { LayoutProvider } from "./context/LayoutContext";
import { Provider } from 'react-redux';
//import { CookiesProvider } from 'react-cookie';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';
import "./index.css"
import store from './configureStore';
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            {/* <CookiesProvider> */}
              <App />
            {/* </CookiesProvider> */}
          </ThemeProvider>
        </StylesProvider> 
    </LayoutProvider>
  </Provider>,
  document.getElementById("root"),
);


