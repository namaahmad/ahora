import React from "react";

var LayoutStateContext = React.createContext(null);
var LayoutDispatchContext = React.createContext(null);

function layoutReducer(state: any, action: any) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider(props:any) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: true,
  });
  var dispatchAny = dispatch as any;
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatchAny}>
        {props.children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState(): any {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };

// ###########################################################
function toggleSidebar(dispatch: any) {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
}
