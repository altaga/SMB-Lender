import React, { Component } from 'react';
import lighthouse from '@lighthouse-web3/sdk';
import autoBind from 'auto-bind';
import { Button, Card, CardBody, CardHeader, Input, Row } from 'reactstrap';
import smbLogo from "../assets/smb.png"

class Lighthouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentagesDone: [0.0, 0.0, 0.0],
            cid: ["", "", ""]
        }
        autoBind(this)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    progressCallback1(progressData) {
        let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        let percentagesDone = this.state.percentagesDone
        percentagesDone[0] = percentageDone
        console.log(percentagesDone)
        this.setState({
            percentagesDone
        })
    };

    progressCallback2(progressData) {
        let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        let percentagesDone = this.state.percentagesDone
        percentagesDone[1] = percentageDone
        this.setState({
            percentagesDone
        })
    };

    progressCallback3(progressData) {
        let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        let percentagesDone = this.state.percentagesDone
        percentagesDone[2] = percentageDone
        this.setState({
            percentagesDone
        })
    };

    async deploy(e, index) {
        console.log(e)
        let output;
        if (index === 0) {
            output = await lighthouse.upload(e, "XXXXXXXXXXXXXXXXXXXXXXX", this.progressCallback1);
        }
        else if (index === 1) {
            output = await lighthouse.upload(e, "XXXXXXXXXXXXXXXXXXXXXXX", this.progressCallback2);
        }
        else if (index === 2) {
            output = await lighthouse.upload(e, "XXXXXXXXXXXXXXXXXXXXXXX", this.progressCallback3);
        }
        let cid = this.state.cid 
        cid[index] = output.data.Hash
        let percentagesDone = this.state.percentagesDone
        percentagesDone[index] = 100
        console.log(cid)
        this.setState({
            cid,
            percentagesDone
        })
    }

    render() {
        return (
            <Row>
                <Card style={{ minHeight: "100vh", minWidth: "100vw" }}>
                    <CardHeader style={{ textAlign: "center", height: "12vh", background: "white", borderBottom: "2px solid #0052ff" }}>
                        <img alt="logoSMB" src={smbLogo} style={{ height: 720 * 0.1, width: 1280 * 0.1 }} />
                    </CardHeader>
                    <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                        <div style={{ paddingTop: "2vh" }} />
                        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
                            Upload ID: {this.state.percentagesDone[0]}%
                        </div>
                        <div style={{ paddingTop: "2vh" }} />
                        <Input style={{
                            fontSize: "1.5rem",
                            minWidth: "80vw",
                            borderRadius: "100px",
                            color: "black",
                            alignItems: "center",
                            textAlign: "center"
                        }} onChange={e => this.deploy(e, 0)} type="file" />
                        <div style={{ paddingTop: "2vh" }} />
                        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
                            Upload Incorporation Act: {this.state.percentagesDone[1]}%
                        </div>
                        <div style={{ paddingTop: "2vh" }} />
                        <Input style={{
                            fontSize: "1.5rem",
                            minWidth: "80vw",
                            borderRadius: "100px",
                            color: "black",
                            alignItems: "center",
                            textAlign: "center"
                        }} onChange={e => this.deploy(e, 1)} type="file" />
                        <div style={{ paddingTop: "2vh" }} />
                        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
                            Upload Logo: {this.state.percentagesDone[2]}%
                        </div>
                        <div style={{ paddingTop: "2vh" }} />
                        <Input style={{
                            fontSize: "1.5rem",
                            minWidth: "80vw",
                            borderRadius: "100px",
                            color: "black",
                            alignItems: "center",
                            textAlign: "center"
                        }} onChange={e => this.deploy(e, 2)} type="file" />
                        <div style={{ paddingTop: "10vh" }} />
                        <Button disabled={!(this.state.cid.every((item) => item !== ""))} onClick={() => window.open(`smblender://cid/${JSON.stringify(this.state.cid)}`)}
                            style={{
                                fontSize: "1.5rem",
                                minWidth: "90vw",
                                minHeight: "10vh",
                                borderRadius: "100px",
                                background: "#0090ff",
                                color: "white",
                                alignItems: "center",
                                textAlign: "center"
                            }}
                        >
                            Return to app
                        </Button>
                    </CardBody>
                </Card>
            </Row>
        );
    }
}

export default Lighthouse;