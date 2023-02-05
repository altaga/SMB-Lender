import React, { Component } from 'react';
import { Dimensions, View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import Header from "../components/header"
import Footer from "../components/footer"
import GlobalStyles from '../styles/styles';
import ContextModule from '../utils/contextModule';
import { contentColor, NODE_ENV_NETWORK_RCP } from '../envs/env-production';
import { ethers } from 'ethers';
import EncryptedStorage from 'react-native-encrypted-storage';
import Recieve from './recieve';

class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            buttonState: "Send",
        }
        this.provider = new ethers.providers.JsonRpcProvider(NODE_ENV_NETWORK_RCP)
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.mount = true
        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
        })
    }

    componentWillUnmount() {

    }

    async send() {
        this.setState({
            buttonState:"Sending..."
        })
        const tx = {
            to: this.context.value.to.substring(0, 9) === "ethereum:" ? this.context.value.to.substring(9, 51) : this.context.value.to.substring(0, 42),
            value: ethers.utils.parseEther(this.state.text)
        };
        const session = await EncryptedStorage.getItem("userPrivs");
        if (session !== null) {
            const signer = new ethers.Wallet(JSON.parse(session).value.privateKey, this.provider);
            let res = await signer.sendTransaction(tx)
            let reciept = await res.wait()
            console.log(reciept)
            this.setState({
                buttonState:"Send"
            })
        }
        else{
            this.setState({
                buttonState:"Send"
            })
        }
    }

    render() {
        const styles = StyleSheet.create({
            buttonStyle: {
                backgroundColor: contentColor,
                borderRadius: 50,
                padding: 8,
                marginTop: 8,
                width: Dimensions.get('window').width * .9,
                alignItems: 'center',
                fontSize: 24,
            },
            buttonStyleDisabled: {
                backgroundColor: contentColor + "77",
                borderRadius: 50,
                padding: 8,
                marginTop: 8,
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
                <View style={GlobalStyles.container}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: Dimensions.get("window").width
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'black',
                            marginTop: 30,
                            marginBottom: 30,
                            width: Dimensions.get("window").width - 38
                        }}>
                            {
                                this.context.value.to !== "" ?
                                    <>
                                        To: {"\n"}
                                        {this.context.value.to.substring(0, 9) === "ethereum:" ? this.context.value.to.substring(9, 30) : this.context.value.to.substring(0, 21)} {"\n"}
                                        {this.context.value.to.substring(0, 9) === "ethereum:" ? this.context.value.to.substring(30, 51) : this.context.value.to.substring(21, 42)}
                                    </>
                                    :
                                    <>
                                        Scan QR Address
                                    </>
                            }

                        </Text>
                        <Pressable
                            style={{
                                width: 38
                            }}
                            onPress={() => this.props.navigation.navigate('QrWalletScan')}
                        >
                            <Icon name="scan" size={38} color="black" />
                        </Pressable>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: 'center',
                        width: Dimensions.get("window").width
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {this.state.text === "" ?
                                0 : this.state.text} {" "}FIL
                        </Text>
                    </View>
                    <VirtualKeyboard
                        decimal={true}
                        rowStyle={{
                            width: Dimensions.get('window').width,
                            borderRadius: 5,
                            margin: 10,
                        }}
                        cellStyle={
                            {
                                height: Dimensions.get('window').width / 7,
                                borderWidth: 0,
                                margin: 1,
                            }
                        }
                        colorBack={'white'}
                        color='black'
                        pressMode='string'
                        onPress={
                            (val) => this.setState({
                                text: val
                            })
                        }
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 4 }}>
                        <Pressable
                            disabled={this.state.buttonState === "Sending..." || this.state.buttonState === "Sending..."}
                            style={this.state.buttonState === "Sending..." ? styles.buttonStyleDisabled : styles.buttonStyle} onPress={() => this.send()}>
                            <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
                                {
                                    this.state.buttonState
                                }
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <Footer stage={2} navigation={this.props.navigation} />
            </>
        );
    }
}

export default Send;