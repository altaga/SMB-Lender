import React, { Component } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Text, Image, ScrollView, TextInput, Linking } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';
import GlobalStyles from '../styles/styles';
import ContextModule from '../utils/contextModule';
import logo from "../assets/logo.png"
import { contentColor, NODE_ENV_NETWORK_ID, NODE_ENV_NETWORK_RCP } from '../envs/env-production';
import { ethers, ContractFactory } from 'ethers';
import { abiSMBcontract, bytecodeSMBcontract } from '../contracts/smb-contract';
import EncryptedStorage from 'react-native-encrypted-storage';
import { abiSMBregister } from '../contracts/smb-register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const register = "0x3029f11f56586870a3b3e16fC15030b9F9bECDEF"
const USDC = "0xc1908C35eF76b7642e20e650EC9274Ab5FA68c84"
const status = ["pending", "active", "rejected", "completed"]

class Dapp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0, // 0
            substage: 0,
            loading: false,
            connected: false,
            // Form Data
            amount: 0,
            cid: "",
            contractAddress: "",
            // contract info
            status: "loading",
            balance: 0.0,
            ir: 0.0,
            amount: 0.0
        }
        this.provider = new ethers.providers.JsonRpcProvider(NODE_ENV_NETWORK_RCP)
        this.mount = true
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            if (this.context.value.contract !== "") {
                console.log(this.context.value.contract)
                const contract = new ethers.Contract(this.context.value.contract, abiSMBcontract, this.provider)
                let temp = new Array(3)
                temp = await Promise.all([contract.status(), contract.getBalanceECR20(USDC), contract.ir(), contract.amount()])
                this.mount && this.setState({
                    status: status[parseInt(temp[0])],
                    balance: ethers.utils.formatEther(temp[1]),
                    ir: parseInt(temp[2]),
                    amount: ethers.utils.formatEther(temp[3])
                })
            }

        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            if (this.props?.route && this.state.cid === "") {
                this.mount && this.setState({
                    cid: this.props.route.params.cid,
                    substage: 1,
                    button1: true
                })
            }
        } catch {
            // nothing
        }
    }

    componentWillUnmount() {
        this.mount = false
    }

    render() {
        const styles = StyleSheet.create({
            buttonStyle: {
                backgroundColor: contentColor,
                borderRadius: 50,
                padding: 8,
                width: Dimensions.get('window').width * .9,
                alignItems: 'center',
                fontSize: 24,
            },
            buttonStyleDisabled: {
                backgroundColor: contentColor + "77",
                borderRadius: 50,
                padding: 8,
                width: Dimensions.get('window').width * .9,
                alignItems: 'center',
                fontSize: 24,
            },
            bottomContent: {
                position: 'absolute',
                bottom: "20%"
            }
        });
        return (
            <>
                <Header />
                {
                    this.context.value.contract === "" ?
                        <View style={GlobalStyles.container}>
                            {
                                this.state.stage === 0 &&
                                <>
                                    <View>
                                        <Text style={{
                                            fontSize: 30,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: contentColor,
                                            marginVertical: 10
                                        }}
                                        >
                                            Loan application
                                        </Text>
                                    </View>
                                    <View>
                                        <Image source={logo} style={{ height: 720 * 0.3, width: 1280 * 0.3 }} />
                                    </View>
                                    <Pressable style={styles.buttonStyle} onPress={() => this.setState({ stage: 1 })}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'white',
                                            marginVertical: 10
                                        }}
                                        >
                                            Start Form
                                        </Text>
                                    </Pressable>
                                </>
                            }
                            {
                                this.state.stage === 1 &&
                                <>
                                    <View style={{ height: "100%", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                                        <View style={{ width: "90%", textAlign: "center", paddingBottom: 20 }}>
                                            <Text style={{ fontSize: 28, fontWeight: "bold", color: "black", textAlign: "center" }}>
                                                Amount (USDC)
                                            </Text>
                                            <View style={{ marginVertical: 6 }} />
                                            <TextInput
                                                style={{ fontSize: 24, textAlign: "center", borderRadius: 6, borderWidth: 1, borderColor: "#0052FE", backgroundColor: 'white', color: "black" }}
                                                keyboardType="number-pad"
                                                value={this.state.amount.toString()}
                                                onChangeText={(value) => this.setState({ amount: value })}
                                            />
                                        </View>
                                        <Pressable disabled={!(this.state.amount > 0 && this.state.substage === 0)} style={(this.state.amount > 0 && this.state.substage === 0) ? styles.buttonStyle : styles.buttonStyleDisabled} onPress={() => { Linking.openURL("https://light.smb-lending.services/") }}>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white',
                                                marginVertical: 10
                                            }}>
                                                {
                                                    this.state.substage < 1 ? "Upload Documents" : "Documents Ready"
                                                }
                                            </Text>
                                        </Pressable>
                                        <Pressable disabled={this.state.substage !== 1 || this.state.loading} style={(this.state.substage !== 1 || this.state.loading) ? styles.buttonStyleDisabled : styles.buttonStyle} onPress={async () => {
                                            this.setState({
                                                loading: true
                                            })
                                            const session = await EncryptedStorage.getItem("userPrivs");
                                            if (session !== null) {
                                                const signer = new ethers.Wallet(JSON.parse(session).value.privateKey, this.provider);
                                                const factory = new ContractFactory(abiSMBcontract, bytecodeSMBcontract, signer);
                                                const contract = await factory.deploy();
                                                this.setState({
                                                    loading: false,
                                                    contractAddress: contract.address,
                                                    substage: 2
                                                })
                                            }
                                        }}>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white',
                                                marginVertical: 10
                                            }}>
                                                {
                                                    this.state.substage < 2 ? "Deploy Contract" : "Contract Ready"
                                                }
                                            </Text>
                                        </Pressable>
                                        <Pressable disabled={this.state.substage !== 2 || this.state.loading} style={(this.state.substage !== 2 || this.state.loading) ? styles.buttonStyleDisabled : styles.buttonStyle} onPress={async () => {
                                            this.setState({
                                                loading: true
                                            })
                                            const session = await EncryptedStorage.getItem("userPrivs");
                                            if (session !== null) {
                                                const signer = new ethers.Wallet(JSON.parse(session).value.privateKey, this.provider);
                                                const contract = new ethers.Contract(register, abiSMBregister, signer);
                                                let results = await contract.addNew(this.state.contractAddress, this.state.amount, this.state.cid)
                                                await results.wait()
                                                const contract2 = new ethers.Contract(this.state.contractAddress, abiSMBcontract, this.provider)
                                                let temp = new Array(3)
                                                temp = await Promise.all([contract2.status(), contract2.getBalanceECR20(USDC), contract2.ir(), contract2.amount()])
                                                this.mount && this.setState({
                                                    status: status[parseInt(temp[0])],
                                                    balance: ethers.utils.formatEther(temp[1]),
                                                    ir: parseInt(temp[2]),
                                                    amount: ethers.utils.formatEther(temp[3])
                                                })
                                                try {
                                                    await AsyncStorage.setItem("contractLending",
                                                        JSON.stringify({
                                                            value: this.state.contractAddress
                                                        }))
                                                    this.context.setValue({
                                                        contract: this.state.contractAddress
                                                    })
                                                } catch (e) {
                                                    // saving error
                                                }
                                            }
                                        }}>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white',
                                                marginVertical: 10
                                            }}>
                                                {
                                                    "Complete Register"
                                                }
                                            </Text>
                                        </Pressable>
                                    </View>
                                </>
                            }
                            {
                                this.state.stage === 2 &&
                                <>
                                    <View>
                                        <Text style={{ color: "black" }}>
                                            {
                                                this.state.cid
                                            }
                                        </Text>
                                    </View>
                                </>
                            }
                        </View>
                        :
                        <View style={GlobalStyles.container}>
                            <View style={{ borderColor: contentColor, borderWidth: 2 }}>
                                <QRCode
                                    value={this.context.value.contract}
                                    size={Dimensions.get("window").width * 0.9}
                                    quietZone={10}
                                    ecl="H"
                                />
                            </View>
                            <Text style={{ color: "black", fontSize: 24 }}>
                                Lending Status:{" "}
                                {
                                    this.state.status
                                }
                            </Text>
                            <Text style={{ color: "black", fontSize: 24 }}>
                                Base Amount:{" "}
                                {
                                    this.state.amount
                                }
                                {" "}USDC
                            </Text>
                            <Text style={{ color: "black", fontSize: 24 }}>
                                Balance:{" "}
                                {
                                    this.state.balance
                                }
                                {" "}USDC
                            </Text>
                            <Text style={{ color: "black", fontSize: 24 }}>
                                IR:{" "}
                                {
                                    parseFloat(this.state.ir)
                                }
                                %
                            </Text>
                        </View>
                }
                <Footer stage={3} navigation={this.props.navigation} />
            </>
        );
    }
}

export default Dapp;