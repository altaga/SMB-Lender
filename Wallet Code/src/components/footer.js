import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons"
import IconII from "react-native-vector-icons/Ionicons"
import IconO from "react-native-vector-icons/Octicons"
import GlobalStyles from '../styles/styles';
import ContextModule from '../utils/contextModule';

class Footer extends Component {

    static contextType = ContextModule;

    render() {
        return (
            <View style={[GlobalStyles.footer, { flexDirection: "row", justifyContent: "space-around", alignItems: "center" }]}>
                <Pressable style={{ alignItems: "center" }} onPress={() => this.props.navigation.navigate('Main')}>
                    <IconMI name="home-filled" size={30} color={`#FFFFFF${this.props.stage === 0 ? "FF" : "77"}`} />
                    <Text style={{ fontSize: 18, color: `#FFFFFF${this.props.stage === 0 ? "FF" : "77"}` }}>Wallet</Text>
                </Pressable>
                <Pressable style={{ alignItems: "center" }} onPress={() => this.props.navigation.navigate('Recieve')}>
                    <IconII name="enter-outline" size={30} color={`#FFFFFF${this.props.stage === 1 ? "FF" : "77"}`} />
                    <Text style={{ fontSize: 18, color: `#FFFFFF${this.props.stage === 1 ? "FF" : "77"}` }}>Recieve</Text>
                </Pressable>
                <Pressable style={{ alignItems: "center" }} onPress={() => this.props.navigation.navigate('Send')}>
                    <IconII name="exit-outline" size={30} color={`#FFFFFF${this.props.stage === 2 ? "FF" : "77"}`} />
                    <Text style={{ fontSize: 18, color: `#FFFFFF${this.props.stage === 2 ? "FF" : "77"}` }}>Send</Text>
                </Pressable>
                <Pressable style={{ alignItems: "center" }} onPress={() => this.props.navigation.navigate('Dapp')}>
                    <IconII name="apps" size={30} color={`#FFFFFF${this.props.stage === 3 ? "FF" : "77"}`} />
                    <Text style={{ fontSize: 18, color: `#FFFFFF${this.props.stage === 3 ? "FF" : "77"}` }}>Lending</Text>
                </Pressable>
            </View>
        );
    }
}

export default Footer;