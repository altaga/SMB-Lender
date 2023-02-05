import React, { Component } from 'react';
import smbLogo from "../assets/smb.png"
import ContextModule from '../utils/contextModule';

class Sidebar extends Component {

    static contextType = ContextModule;

    render() {
        let myHR = <div style={{ borderBottom: "1px solid white", width: "100%" }} />
        return (
            <div style={{ width: "20%", height: "100%", position: "absolute", left: 0, backgroundColor: "#0090ff" }}>
                <div style={{ height: "100%", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ position: "absolute", top: 0 }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img alt="SMBlogo1" style={{ width: "80%", justifySelf: "center" }} src={smbLogo} />
                        </div>
                    </div>
                    {myHR}
                    <div
                        onClick={() => this.context.setValue({
                            menu: 0
                        })}
                        style={{ margin: "20px 0px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer", color:"white" }}>
                        Pending Contracts
                    </div>
                    {myHR}
                    <div
                        onClick={() => this.context.setValue({
                            menu: 1
                        })}
                        style={{ margin: "20px 0px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer", color:"white" }}>
                        Active Contracts
                    </div>
                    {myHR}
                    <div
                        onClick={() => this.context.setValue({
                            menu: 2
                        })}
                        style={{ margin: "20px 0px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer", color:"white" }}>
                        Rejected Contracts
                    </div>
                    {myHR}
                    <div
                        onClick={() => this.context.setValue({
                            menu: 3
                        })}
                        style={{ margin: "20px 0px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer", color:"white" }}>
                        Completed Contracts
                    </div>
                    {myHR}
                </div>
            </div>
        );
    }
}

export default Sidebar;