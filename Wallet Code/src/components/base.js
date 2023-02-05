import React, { Component } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../styles/styles';

class Main extends Component {
    constructor(props) {
        super(props);

    }

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
            <View style={GlobalStyles.container}>

            </View>
        );
    }
}

export default Main;