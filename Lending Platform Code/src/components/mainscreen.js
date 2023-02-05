import React, { Component } from 'react';
import Active from '../menu/active';
import Completed from '../menu/completed';
import Pending from '../menu/pending';
import Rejected from '../menu/rejected';
import ContextModule from '../utils/contextModule';

class Mainbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{ width: "80%", height: "100%", position: "absolute", left: "20%", backgroundColor: "white" }}>
                {
                    this.context.value.menu === 0 &&
                    <Pending/>
                }
                {
                    this.context.value.menu === 1 &&
                    <Active/>
                }
                {
                    this.context.value.menu === 2 &&
                    <Rejected/>
                }
                {
                    this.context.value.menu === 3 &&
                   <Completed/>
                }
            </div>
        );
    }
}

export default Mainbar;