import React, { Component } from 'react'
import ContextModule from '../utils/contextModule';
import QrReader from '../utils/QrWallet';

export default class QrWalletScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static contextType = ContextModule;
    
    render() {
        return (
            <QrReader />
        )
    }
}
