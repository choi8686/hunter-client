import React, { Fragment } from "react";
// import AppNavigator from "./navigations/Navigations";
import AppNavigator from "./navigations/switchNavigation";

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
