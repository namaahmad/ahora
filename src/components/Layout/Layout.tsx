import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  RouteComponentProps
} from "react-router-dom";
import classnames from "classnames";
import Loader from '../Widget/Loader';
// styles
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
// pages
const Factor = React.lazy(() => import('../../pages/factors/factor'));
const CreateFactor = React.lazy(() => import('../../pages/factors/CreateFactor'));
// context

const loading = () => <Loader />;
const Layout: React.SFC<RouteComponentProps> = (props: any) => {
  var classes = useStyles();
  const [isLoading, setIsloading] = useState(true);
  // global
  var layoutState = useLayoutState();
  useEffect(() => {
   setIsloading(false)
  }, [])
  return (isLoading ? (<Loader />) :
    <div className={classes.root} style={{ direction: "rtl" }}>
      <>
        <Header history={props.history} />
        <Sidebar />
      
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState?.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/app/factor" exact={true} component={Factor} />
              <Route path="/app/factor/create" exact={true} component={CreateFactor} />
            </Switch>
          </React.Suspense>
        </div>
      </>
    </div>
  );
}

export default Layout as React.FC;
