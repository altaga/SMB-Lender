import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import GlobalStyles from '../styles/styles';
import QRCode from 'react-native-qrcode-svg';
import ContextModule from '../utils/contextModule';
import Header from '../components/header';
import Footer from '../components/footer';
import { contentColor, NODE_ENV_NETWORK_NAME } from '../envs/env-production';

class Recieve extends Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <>
                <Header />
                <View style={[GlobalStyles.container, { flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }]}>
                    <Text style={{ textAlign: "center", color: "black", fontSize: 22, width: "80%" }}>
                        {NODE_ENV_NETWORK_NAME} Address:
                        {"\n"}
                        {
                            this.context.value.account.substring(0, 21)
                        }
                        {"\n"}
                        {
                            this.context.value.account.substring(21, 42)
                        }
                    </Text>
                    <View style={{ borderColor: contentColor, borderWidth: 2 }}>
                        <QRCode
                            value={"ethereum:"+this.context.value.account+"@1284" ?? ""}
                            size={Dimensions.get("window").width * 0.9}
                            quietZone={10}
                            ecl="H"
                        />
                    </View>
                    <Text style={{ textAlign: "center", color: "black", fontSize: 28, width: "80%" }}>
                        Scan with your{"\n"} mobile wallet
                    </Text>
                </View>
                <Footer stage={1} navigation={this.props.navigation} />
            </>
        );
    }
}

export default Recieve;