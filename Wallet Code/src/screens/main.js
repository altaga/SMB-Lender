import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import Header from "../components/header"
import Footer from "../components/footer"
import { contentColor, geckoNative, geckoTokens, native, nativeIcon, nativeName, NODE_ENV_NETWORK_RCP, tokens, tokensContracts, tokensIcons, tokensName } from '../envs/env-production';
import GlobalStyles from '../styles/styles';
import { ethers } from 'ethers';
import { abiERC20 } from "../contracts/erc20"
import ContextModule from '../utils/contextModule';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balances: new Array([nativeName].concat(tokensName).length).fill(0),
            multipliers: new Array([nativeName].concat(tokensName).length).fill(1),
        }
        this.provider = new ethers.providers.JsonRpcProvider(NODE_ENV_NETWORK_RCP)
    }

    static contextType = ContextModule;

    async getPrice(coin) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`, requestOptions)
                .then(response => response.text())
                .then(result => resolve(JSON.parse(result)[coin].usd))
                .catch(error => console.log('error', error));
        })
    }

    async getBalance(provider, address) {
        return new Promise(async (resolve, reject) => {
            const balance = await provider.getBalance(address)
            resolve(ethers.utils.formatEther(balance))
        })
    }

    async getBalanceToken(provider, address, tokenAddress) {
        return new Promise(async (resolve, reject) => {
            const contract = new ethers.Contract(tokenAddress, abiERC20, provider);
            let res = await contract.balanceOf(address)
            let decimals = await contract.decimals()
            resolve(res / (Math.pow(10, decimals)))
        })
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            const account = this.context.value.account
            let temp = await Promise.all(
                [
                    this.getBalance(this.provider, account),
                    this.getPrice(geckoNative),
                    Promise.all(
                        tokensContracts.map((contract) => this.getBalanceToken(this.provider, account, contract))
                    ),
                    Promise.all(
                        geckoTokens.map((token) => this.getPrice(token))
                    )
                ])
            let balances = [temp[0]].concat(temp[2])
            let multipliers = [temp[1]].concat(temp[3])
            this.setState({
                balances,
                multipliers
            })

        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
                <Header />
                <View style={GlobalStyles.container2}>
                    <View style={{ alignSelf: "flex-start", marginLeft: "6%", marginTop: "5%" }}>
                        <Text style={{ fontSize: 20, color: "black" }}>
                            Wallet
                        </Text>
                    </View>
                    <View style={{ marginTop: "5%", height: 180, width: "90%", backgroundColor: contentColor, borderRadius: 25 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={{ color: "white" }}>
                                Total Wallet Balance
                            </Text>
                            <Text style={{ fontSize: 36, color: "white" }}>
                                {"$ "}
                                {
                                    epsilonRound(this.state.balances.reduce((partialSum, a, index) => partialSum + a * this.state.multipliers[index], 0) ?? 0)
                                }
                                {"  USD"}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: "10%" }}>
                                <View>
                                    <Text style={{ color: "white" }}>
                                        {this.context.value.account.substring(0, 21)}
                                    </Text>
                                    <Text style={{ color: "white" }}>
                                        {this.context.value.account.substring(21, 42)}
                                    </Text>
                                </View>
                                <Pressable onPress={() => {
                                    Alert.alert('Address Copied to Clipboard');
                                    Clipboard.setString(this.context.value.account)
                                }}>
                                    <Icon name="copy" size={30} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: "flex-start", marginLeft: "6%", marginTop: "5%" }}>
                        <Text style={{ fontSize: 20, color: "black" }}>
                            Assets
                        </Text>
                    </View>
                    <ScrollView horizontal={true} style={{ flexDirection: "row", marginHorizontal: 10 }}>
                        {
                            [nativeName].concat(tokensName).map((item, index) =>
                                <View key={"Token" + index} style={{ marginHorizontal: 10, marginVertical: 20, height: 180, width: 180, backgroundColor: contentColor, borderRadius: 25 }}>
                                    <View style={{ margin: 20 }}>
                                        <Image style={{ width: 40, height: 40, borderColor: "black", borderWidth: 1, borderRadius: 40, marginBottom: 10 }} source={[nativeIcon].concat(tokensIcons)[index]} />
                                        <Text style={{ color: "white" }}>
                                            {item}
                                        </Text>
                                        <Text style={{ fontSize: 22, color: "white" }}>
                                            {
                                                epsilonRound(parseFloat(this.state.balances[index] ?? 0))
                                            }
                                            {" "}
                                            {[native].concat(tokens)[index]}
                                        </Text>
                                        <Text style={{ fontSize: 18, color: "white", marginTop: "10%", textAlign: "right" }}>
                                            $
                                            {
                                                epsilonRound(this.state.multipliers[index] ?? 0)
                                            }
                                            {" USD"}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
                <Footer stage={0} navigation={this.props.navigation} />
            </>
        );
    }
}

export default Main;