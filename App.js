import React, { Fragment } from "react";
import AppNavigator from "./navigations/Navigations";

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
