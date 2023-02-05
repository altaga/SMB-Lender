// Basic Imports
import React, { Component } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
// Components
import VirtualKeyboard from 'react-native-virtual-keyboard';
// Utils
import reactAutobind from 'react-autobind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
// Utils Local
import ContextModule from '../utils/contextModule';
// Assets
import Icon from 'react-native-vector-icons/FontAwesome5';
import logo from "../assets/logo.png"
// Styles
import GlobalStyles from '../styles/styles';
import { contentColor, iconColor, NODE_ENV_NETWORK_APPNAME, NODE_ENV_NETWORK_NAME } from "../envs/env-production"

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            pincode: "",
            text: "Create",
            phrase: ""
        };
        reactAutobind(this)
        this.checkPincode = false
        this.checkWallet = false
        this.checkAddress = false
        this.ethers = require('ethers')
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            // await this.erase()
            // User Address
            try {
                const session = await AsyncStorage.getItem('userAddress');
                if (session !== null) {
                    this.context.setValue({
                        account: JSON.parse(session).value
                    })
                    this.checkAddress = true
                }
                else {
                    this.checkAddress = false
                }
            } catch (error) {
                this.checkAddress = false
            }
            try {
                const session = await AsyncStorage.getItem('contractLending');
                if (session !== null) {
                    this.context.setValue({
                        contract: JSON.parse(session).value
                    })
                }
                else {
                    // Nothing
                }
            } catch (error) {
                // Nothing
            }
            // User PIN
            try {
                const session = await EncryptedStorage.getItem("userPIN");
                if (session !== null) {
                    this.checkPincode = true
                }
                else {
                    this.checkPincode = false
                }
            } catch (error) {
                this.checkPincode = false
            }
            // User Privs
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    this.checkWallet = true
                }
                else {
                    this.checkWallet = false
                }
            } catch (error) {
                this.checkWallet = false
            }
            if (this.checkWallet && this.checkPincode && this.checkAddress) {
                //this.props.navigation.navigate('Main')
                this.props.navigation.navigate('Dapp')
            }
            else {
                this.setState({
                    stage: 1
                })
            }
        })
    }

    async storeUserPIN() {
        try {
            await EncryptedStorage.setItem(
                "userPIN",
                JSON.stringify({
                    value: this.state.pincode.substring(0, 4)
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeUserPrivs(value) {
        try {
            await EncryptedStorage.setItem(
                "userPrivs",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeUserAddress(value) {
        try {
            await AsyncStorage.setItem('userAddress', JSON.stringify({ value }))
        } catch (e) {
            // saving error
        }
    }

    changeText = (val) => {
        if (val.length <= 4) {
            this.setState({
                pincode: val
            });
        }
    }

    // Dev Only
    async erase() {
        try {
            await EncryptedStorage.clear();
            await AsyncStorage.clear()
            // Congrats! You've just cleared the device storage!
        } catch (error) {
            // There was an error on the native side
        }
    }

    render() {
        return (
            <View style={GlobalStyles.container}>
                {
                    this.state.stage === 0 &&
                    <>
                        <Image source={logo} style={{ height: 720 * 0.3, width: 1280 * 0.3 }} />
                    </>
                }
                {
                    this.state.stage === 1 &&
                    <>
                        <Image source={logo} style={{ height: 720 * 0.3, width: 1280 * 0.3 }} />
                        <Text style={{ textAlign: "center", width: "80%", fontSize: 24, fontFamily: "Helvetica", color: "black" }}>
                            Wallet for {"\n"} {NODE_ENV_NETWORK_APPNAME}
                        </Text>
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.setState({
                            stage: 2
                        })}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Create new wallet
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 2 &&
                    <>
                        <Icon name="shield-alt" size={128} color={iconColor} />
                        <Text style={{ textAlign: "center", width: "80%", fontSize: 24, fontFamily: "Helvetica", color: "black" }}>
                            Protect Wallet {"\n"}with a pincode
                        </Text>
                        <Pressable style={[GlobalStyles.button]} onPress={() => this.setState({
                            stage: 3
                        })}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Set Pincode
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 3 &&
                    <>
                        <Text style={{ textAlign: "center", fontSize: 42, fontFamily: "Helvetica", color: "black" }}>
                            Pincode Setup
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "black" }}>
                                {
                                    this.state.pincode.substring(0, 1) === "" ? "•" : this.state.pincode.substring(0, 1)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "black" }}>
                                {
                                    this.state.pincode.substring(1, 2) === "" ? "•" : this.state.pincode.substring(1, 2)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "black" }}>
                                {
                                    this.state.pincode.substring(2, 3) === "" ? "•" : this.state.pincode.substring(2, 3)
                                }
                            </Text>
                            <Text style={{ textAlign: "center", width: "20%", fontSize: 36, fontFamily: "Helvetica", color: "black" }}>
                                {
                                    this.state.pincode.substring(3, 4) === "" ? "•" : this.state.pincode.substring(3, 4)
                                }
                            </Text>
                        </View>
                        <VirtualKeyboard
                            rowStyle={{
                                width: Dimensions.get('window').width,
                            }}
                            cellStyle={
                                {
                                    height: Dimensions.get('window').width / 7,
                                    borderWidth: 0,
                                    margin: 1,
                                }
                            }
                            colorBack={'black'}
                            color={contentColor}
                            pressMode='string'
                            onPress={(val) => this.changeText(val)}
                        />
                        <Pressable style={[GlobalStyles.button]} onPress={async () => {
                            await this.storeUserPIN()
                            this.setState({
                                pincode: "",
                                stage: 4
                            })
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                Set Pincode
                            </Text>
                        </Pressable>
                    </>
                }
                {
                    this.state.stage === 4 &&
                    <>
                        <Text style={[GlobalStyles.simpleText, { fontSize: 24, width: "80%" }]}>
                            Secret Recovery Phrase
                        </Text>
                        <Text style={[GlobalStyles.simpleText, { fontSize: 16 }]}>
                            This is the only way you will be able to recover your wallet. Please store it somewhere safe.
                        </Text>
                        <View style={{ backgroundColor: "white", borderColor: contentColor, borderWidth: 1, width: "90%", height: "30%", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                            {
                                ["", "", ""].map((item, index) => {
                                    return (
                                        <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 15, width: "33%" }]}>
                                            {
                                                item
                                            }
                                        </Text>
                                    )
                                })
                            }
                            {
                                this.state.phrase.split(" ").map((item, index) => {
                                    return (
                                        <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 24, width: "33%" }]}>
                                            {
                                                item
                                            }
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <Pressable disabled={this.state.text === "Creating"} style={[this.state.text === "Creating" ? GlobalStyles.buttonDisabled : GlobalStyles.button]} onPress={() => {
                            if (this.state.phrase !== "") {
                                this.props.navigation.navigate('Main')
                            }
                            else {
                                this.setState({
                                    text: "Creating...",
                                    phrase: "creating.."
                                }, () =>
                                    setTimeout(() => {
                                        const wallet = this.ethers.Wallet.createRandom()
                                        this.storeUserAddress(wallet.address)
                                        this.context.setValue({
                                            account: wallet.address,
                                        })
                                        this.storeUserPrivs({
                                            address: wallet.address,
                                            phrase: wallet.mnemonic.phrase,
                                            privateKey: wallet.privateKey
                                        }),
                                            this.setState({
                                                phrase: wallet.mnemonic.phrase,
                                                text: "Complete Setup",
                                            })
                                    }, 500))
                            }
                        }}>
                            <Text style={[GlobalStyles.buttonText]}>
                                {
                                    this.state.text
                                }
                            </Text>
                        </Pressable>
                    </>
                }
            </View>
        );
    }
}

export default Setup;