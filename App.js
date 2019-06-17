import React, { Fragment } from "react";
// import AppNavigator from "./navigations/Navigations";
import AppNavigator from "./navigations/SwitchNavigation";

export default class App extends React.Component {
  componentDidMount = () => {};
  render() {
    return (
      <Fragment>
        <AppNavigator />
      </Fragment>
    );
  }
}
