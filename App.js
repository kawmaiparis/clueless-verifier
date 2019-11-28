import React from "react";
import Modal, {
  ModalContent,
  ModalButton,
  ModalTitle
} from "react-native-modals";
import QRCode from "react-native-qrcode";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  StatusBar,
  ScrollView
} from "react-native";

import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

class QrScanner extends React.Component {
  state = {
    page: "LOGIN",
    hasCameraPermission: null,
    scanned: false,
    name: "",
    data: "",
    qrValue: "",
    licenses: [],
    license: "",
    proofs: [],
    username: "",
    password: "",
    schemaID: "",
    credDefID: ""
  };

  // async componentDidMount() {
  // 	 this.getPermissionsAsync()
  // }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  /* API Call to get Licenses */
  getLicenses = async () => {
    const url = `http://34.244.72.181:8080/get-licence-type`;

    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === undefined) {
          this.setState({ licenses: response });
        } else {
          alert(`could not find licenses`);
        }
      })
      .catch(() => {
        alert("could not login.");
      });
  };

  goToLicenses = () => {
    this.setState({ page: "LICENSES" });
  };

  goToSchema = () => {
    this.setState({ page: "SCHEMA" });
  };
  goToProof = async license => {
    /* API Call to get Proofs for this licnese */
    console.log(license);
    const url = `http://34.244.72.181:8080/get-proofs?licence=${license}`;
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.status === undefined) {
          this.setState({ license: license, proofs: response, page: "PROOFS" });
        } else {
          alert("could not find any proofs");
        }
      });
  };

  goToQR = async proof => {
    let json = {
      credDefID: this.state.credDefID,
      schemaID: this.state.schemaID,
      proofType: proof,
      licenceType: this.state.license
    };
    let qrInfo = JSON.stringify(json);
    await this.setState({ qrValue: qrInfo });
    await this.setState({ page: "QR" });
  };

  goToReader = () => {
    this.setState({ page: "READER" });
  };

  handleLogin = async () => {
    let { password, username, DID } = this.state;
    name = "VsKV7grR1BUE29mG2Fm2kR";
    const masterSecretID = "masterSecretID";
    console.log(username);
    const url = `http://34.244.72.181:8080/login?did=${DID}&id=${username}&key=${password}&masterDid=${masterSecretID}`;
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let json = JSON.stringify(response);
        if (json.status === undefined) {
          this.getLicenses();
          this.goToLicenses();
        } else {
          alert("could not login. please try again");
        }
      })
      .catch(err => console.log("Well that dint work.\n" + err));
  };

  handleSubmit = async () => {
    console.log(this.state.data);
    let json = JSON.parse(this.state.data);
    console.log(json);

    const bucketName = json.bucketname;
    const objectName = json.filename;
    const { name } = this.state;
    const url = `http://34.244.72.181:8080/prove-s3?bucketName=${bucketName}&name=${name}&objectName=${objectName}`;

    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        alert(`${name}, You have been successfully verified!`);
      } else {
        console.log(response);
        alert(`${name}, sit down and eat some marmites :(`);
      }
      this.setState({ scanned: false });
    });
  };

  componentDidMount() {
    this.getLicenses();
  }

  /* LOGIN ->  LICENSES -> SCHEMA -> PROOFS -> SHOW QR -> READER */

  render() {
    const Login = (
      <View style={styles.container}>
        <Text>Log in </Text>

        <TextInput
          style={styles.logincontainer}
          value={this.state.username}
          placeholder="username"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.logincontainer}
          value={this.state.password}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          style={styles.logincontainer}
          value={this.state.DID}
          placeholder="DID"
          onChangeText={DID => this.setState({ DID })}
        />

        <Button title="log in" onPress={this.handleLogin}></Button>
      </View>
    );
    const Licenses = (
      <View style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>CHOOSE YOUR LICENSE</Text>
          </View>
        </View>
        <View style={styles.list}>
          <ScrollView contentContainerStyle={styles.scrollableList}>
            {this.state.licenses.map(license => (
              <View style={styles.button}>
                <Button
                  key={license}
                  styles={styles.button}
                  color="#ff0057"
                  title={license}
                  onPress={chosen => this.goToProof(license)}
                ></Button>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );

    const Schema = (
      <View style={styles.container}>
        <TextInput
          style={styles.logincontainer}
          value={this.state.username}
          placeholder="Schema ID"
          onChangeText={schemaID => this.setState({ schemaID })}
        />
        <TextInput
          style={styles.logincontainer}
          value={this.state.password}
          placeholder="Cred Def ID"
          secureTextEntry={true}
          onChangeText={credDefID => this.setState({ credDefID })}
        />

        <Button title="log in" onPress={this.handleLogin}></Button>
      </View>
    );

    const Proofs = (
      <View style={styles.container}>
        <Text>Select Your Proof.</Text>
        <View style={styles.list}>
          <ScrollView contentContainerStyle={styles.scrollableList}>
            {this.state.proofs.map(proof => (
              <Button
                color="#ff0057"
                title={proof}
                onPress={chosen => this.goToQR(proof)}
              ></Button>
            ))}
          </ScrollView>
        </View>
      </View>
    );

    const QR = (
      <View style={styles.container}>
        <Text>A qr code somewhere</Text>
        <QRCode value={this.state.qrValue} size={200} />
        <Button
          title="Click me once they scan"
          onPress={this.goToReader}
        ></Button>
      </View>
    );
    const Reader = (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <Modal
          visible={this.state.scanned}
          onTouchOutside={() => this.setState({ scanned: false })}
          modalTitle={<ModalTitle title="Name please" />}
          opacity={0.5}
        >
          <ModalContent>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                textAlign: "center"
              }}
              value={this.state.name}
              placeHolder="Charlie"
              onChangeText={name => this.setState({ name })}
            />
          </ModalContent>
          <Button title="Verify" onPress={this.handleSubmit}></Button>
        </Modal>

        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned
              ? undefined
              : ({ data }) => {
                  this.setState({ data: data, scanned: true });
                }
          }
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );

    switch (this.state.page) {
      case "LOGIN":
        return Login;
      case "LICENSES":
        return Licenses;
      case "SCHEMA":
        return Schema;
      case "PROOFS":
        return Proofs;
      case "QR":
        return QR;
      case "READER":
        return READER;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: 'fff'
  },

  list: {
    height: 300,
    // flex: 1,
    paddingBottom: 10,
    justifyContent: "space-between",
    // marginTop: 70,
    padding: 15
    // marginBottom: 10,
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  scrollableList: {
    // marginTop: 15
  },
  button: {
    padding: 15
  },
  centered: { alignItems: "center" },
  headerContainer: {
    marginTop: 40
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "500"
  }

  // backgroundColor: '#fff',
  // 	alignItems: 'center',
  // 	justifyContent: 'center',
  // 	width: '100%',
  // 	backgroundColor: 'blue'
});
export default QrScanner;
