import autoBind from 'auto-bind';
import { ethers } from 'ethers';
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, ListGroupItem, Row } from 'reactstrap';
import { abiSMBregister } from '../contracts/smb-register';
import { abiERC20 } from "../contracts/erc20"
import ContextModule from '../utils/contextModule';
import { abiSMBcontract } from '../contracts/smb-contract';

const register = "0x3029f11f56586870a3b3e16fC15030b9F9bECDEF"
const USDC = "0xc1908C35eF76b7642e20e650EC9274Ab5FA68c84"

function getLinks(cids) {
    const links = {
        id: 'https://gateway.lighthouse.storage/ipfs/' + cids[0],
        enterprise: 'https://gateway.lighthouse.storage/ipfs/' + cids[1],
        logo: 'https://gateway.lighthouse.storage/ipfs/' + cids[2],
    }
    return links
}

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const gen = Array.from(Array(10).keys())

class Active extends Component {
    constructor(props) {
        super(props);
        this.state = {
            risk: 0.00,
            results:[],
            links:[],
            tokens:[],
            years:[],
            ir:[],
            tokensContract:[],
        }
        this.provider = new ethers.providers.JsonRpcProvider("https://api.hyperspace.node.glif.io/rpc/v1")
        autoBind(this)
    }

    static contextType = ContextModule;

    async getBalanceToken(address, tokenAddress) {
        return new Promise(async (resolve, reject) => {
            const contract = new ethers.Contract(tokenAddress, abiERC20, this.provider);
            let res = await contract.balanceOf(address)
            let decimals = await contract.decimals()
            resolve(res / (Math.pow(10, decimals)))
        })
    }

    async getIR(address) {
        const contract = new ethers.Contract(address, abiSMBcontract, this.provider);
        let ir = await contract.ir()
        return ir
    }

    async componentDidMount() {
        const contract = new ethers.Contract(register, abiSMBregister, this.provider);
        let results = await contract.counter()
        results = [...Array(parseInt(results.toString())).keys()]
        results = await Promise.all(results.map((item) => contract.registerCounter(item)))
        results = await Promise.all(results.map((item) => contract.register(item)))
        results = results.filter((item) => item.status === "accepted")
        let [tokens,tokensContract,ir] = await Promise.all([
            Promise.all(results.map((item) => this.getBalanceToken(item.client, USDC))),
            Promise.all(results.map((item) => this.getBalanceToken(item.clientContract, USDC))),
            Promise.all(results.map((item) => this.getIR(item.clientContract)))
        ])
        let links = results.map((item) => getLinks(JSON.parse(item.info)))
        let years = results.map(() => 0)
        this.setState({
            results,
            links,
            tokens,
            years,
            ir,
            tokensContract
        })
    }

    async connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return true
        }
        else {
            return false
        }
    }

    calculateRisk(id, enterprise, balance, year = 0) {
        let number = 100 - 20 * id - 20 * enterprise - 30 * (balance > 100 ? 1 : balance / 100) - 30 * (year >= 3 ? 1 : year / 3)
        return number
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{ margin: "10%" }}>
                <Card>
                    <CardHeader style={{ backgroundColor: "#0090ff", color: "white", fontWeight: "bold", fontSize: "1.3rem" }}>
                        Accepted Contracts
                    </CardHeader>
                    {
                        this.state.results.filter((item) => item.status === "accepted").map((item, index) =>
                            <CardBody key={"Clients:" + index} style={{borderBottom:"1px solid gray"}}>
                                <Row md="4">
                                    <Col>
                                        <img alt={"Logo:" + index} style={{ width: "100%" }} loading="lazy" src={this.state.links[index].logo} />
                                    </Col>
                                    <Col style={{ textAlign: "center" }}>
                                        Address:
                                        <br />
                                        {item.client.substring(0, 21)}
                                        {"\n"}
                                        {item.client.substring(21, 42)}
                                        <p />
                                        Contract:
                                        <br />
                                        {item.clientContract.substring(0, 21)}
                                        {"\n"}
                                        {item.clientContract.substring(21, 42)}
                                    </Col>
                                    <Col style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                                        <div>
                                            Documents:
                                        </div>
                                        <a href={this.state.links[index].id} target="_blank" rel="noreferrer"> Client ID</a>
                                        <a href={this.state.links[index].enterprise} target="_blank" rel="noreferrer"> Enterprise Document</a>
                                        <div style={{ borderTop: "1px solid gray", width: "100%", marginTop: "10px" }} />
                                        <div>USDC Amount: {item.amount.toString()}</div>
                                        <div>USDC Contract: {this.state.tokensContract[index]}</div>
                                        <div>USDC Collateral: {this.state.tokens[index]}</div>
                                        <div>IR: {this.state.ir[index].toString()} %</div>
                                    </Col>
                                    <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        Risk:
                                        {" "}
                                        {
                                            epsilonRound(this.calculateRisk(1, 1, this.state.tokens[index], this.state.years[index]))
                                        }
                                        {" "}
                                        %
                                        {
                                            this.calculateRisk(1, 1, this.state.tokens[index], this.state.years[index]) > 50 && <div style={{ color: "red", WebkitTextStroke: "0.6px black", fontWeight: "bold" }}>High Risk </div>
                                        }
                                        {
                                            (this.calculateRisk(1, 1, this.state.tokens[index], this.state.years[index]) <= 50 && this.calculateRisk(1, 1, this.state.tokens[index], this.state.years[index]) > 20) && <div style={{ color: "yellow", WebkitTextStroke: "0.6px black", fontWeight: "bold" }}>Medium Risk </div>
                                        }
                                        {
                                            this.calculateRisk(1, 1, this.state.tokens[index], this.state.years[index]) <= 20 && <div style={{ color: "green", WebkitTextStroke: "0.6px black", fontWeight: "bold" }}>Low Risk </div>
                                        }
                                        <div style={{ borderTop: "1px solid gray", width: "100%", margin: "10px 0px" }} />
                                        <div>
                                            Contract Control:
                                        </div>
                                        <p />
                                        <Button
                                            disabled={(this.state.tokensContract[index] < (item.amount * ((this.state.ir[index] / 100) + 1)))}
                                            onClick={async () => {
                                                let res = await this.connectWallet();
                                                if (res) {
                                                    let provider = new ethers.providers.Web3Provider(window.ethereum);
                                                    let signer = provider.getSigner();
                                                    let contract = new ethers.Contract(register, abiSMBregister, signer);
                                                    let gasPrice = this.provider.getGasPrice()
                                                    let gasLimit = await contract.estimateGas.completeLending(item.client)
                                                    res = await contract.completeLending(item.client, { gasLimit, gasPrice })
                                                    await res.wait()
                                                    contract = new ethers.Contract(item.clientContract, abiSMBcontract, signer);
                                                    gasPrice = this.provider.getGasPrice()
                                                    gasLimit = await contract.estimateGas.setupCompleted()
                                                    res = await contract.setupCompleted({ gasLimit, gasPrice })
                                                    await res.wait()
                                                    console.log(res)
                                                }
                                            }} style={{ backgroundColor: "#0090ff" }}>
                                            Complete Loan
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        )
                    }
                </Card>
            </div>
        );
    }
}

export default Active;