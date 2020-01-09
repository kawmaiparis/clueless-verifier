import React from "react";
import * as Font from "expo-font";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { fromRight } from "react-navigation-transitions";

import Login from "./pages/Login";
import License from "./pages/License";
import Proof from "./pages/Proof";
import ShowQR from "./pages/ShowQR";
import ReadQR from "./pages/ReadQR";
import VerifyName from "./pages/VerifyName";

/* LOGIN ->  LICENSES -> PROOFS -> SHOW QR -> READER */

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Login: Login,
    License: License,
    Proof: Proof,
    ShowQR: ShowQR,
    ReadQR: ReadQR,
    VerifyName: VerifyName
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerTransparent: true
    },
    transitionConfig: () => fromRight(500)
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? <AppContainer /> : null;
  }
}
