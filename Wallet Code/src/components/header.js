import React, { Component } from 'react';
import { Image, View } from 'react-native';
import logo from "../assets/logo.png"
import GlobalStyles from '../styles/styles';

class Header extends Component {
    render() {
        return (
            <View style={[GlobalStyles.header, { flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                <Image source={logo} style={{ height: 720 * 0.09, width: 1280 * 0.09 }} />
            </View>
        );
    }
}

export default Header;