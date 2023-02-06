
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](https://youtu.be/1vXEH298I8A)

# SMB Lender
<img src="https://i.ibb.co/nfLMcJC/smb.png" width="60%">

<br>

Welcome, this is our project for [FVM Space Warp Hackathon](https://ethglobal.com/events/spacewarp).

# IMPORTANT!

## Applications:

SMB Wallet APK: [LINK](./Wallet%20APK/app-release.apk)

SMB Platform: [LINK](https://smb-lending.services/)

## Services:

Spheron Services: [Click Here](#spheron)

Lighthouse Services: [Click Here](#lighthouse)

## Here is our main demo video: 

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](https://youtu.be/1vXEH298I8A)

# Introduction and Problem:

Entrepreneurs and business owners in the United States face many obstacles securing capital to start, operate, and grow their small businesses. As forced shutdowns, limited capacities, and stricter regulations continue to place strain on businesses, business owners are seeking financial assistance at greater rates; however, even during times of economic prosperity, acquiring capital for a business has been fraught with complications. The emerging use of blockchain technology in financial services has the potential to transform small business lending and improve capital access for businesses excluded by conventional lending processes.

The main problem is, of course, Access to capital.
 Most small businesses do not have the financial resources necessary to thrive or, in some cases, survive without borrowing. Small business loans provide some assistance, but current programs have considerable room to improve. In 2019, only 51% of small businesses reported receiving their requested loan amount while one in 10 received no funding at all.
The COVID-19 pandemic created a staggering need for financial assistance for businesses, leading to the PPP loans of march  2020. Its goal was to provide aid to small businesses. However, the PPP also served to highlight the cracks in the small business loan system. Some banks prioritized existing customers, and others did not accept applications unless the business had a checking account, a credit card, and a previous loan with that institution. Fraud was also a problem within this system.

Blockchain technology is the key to facilitate the application and loan process and avoid fraud. Since all the activities on a blockchain platform are visible, SBA lenders can decide credit worthiness without an extensive application process and using visible collaterals. Of course the application process and validation is important, but this can be semi-automated and have a base in a smart contract instead of trust on third parties. 



# Solution:

SMB lender is an integral platform for loans on the FEVM totally on Chain. We have our own FEVM wallet as a native Android application, compatible with all Filecoin and ERC20 token operations, in addition to the management of the requested loans through the control of the smart contract affiliated with this wallet, in addition to the ability to share the KYC files through lighthouse and be able to facilitate the loan approval for the lender. In addition, a web platform for the lender, deployed with Sphereon and where you can manage the smart contracts of the borrowed money and business profits.

# System's Architecture:

<img src="https://i.ibb.co/47ndFtL/scheme.png">

- Filecoin EVM: All transactions, assets and smart contracts are on the Hyperspace Filecoin EVM.
  
- Spheron: on this platform we have all the management of the deployment and hosting of our website.
  
- Lighthouse: with this web3 service we manage and upload files to the IPFS network.

# SMB React Natve App:

In order for a client to make use of our lending services, they must first download our SMB Wallet application, which is a 100% functional wallet based entirely on the Filecoin EVM network and ready to work with the ERC20 tokens that the network will have at launch All token values are retrieved in real time from the CoinGecko API.

NOTE: Since Filecoin EVM does not have an already recognized ERC20 list, we generated two test tokens to show the full functionality of the tokenized network.

SMB Token Address: 0x53d3b22E7548C2088785D0A87F1174d3818AB90b
USDC (test) Token: 0xc1908C35eF76b7642e20e650EC9274Ab5FA68c84

<img src="https://i.ibb.co/YPbDYpP/image.png" width="30%"> <img src="https://i.ibb.co/JBNFHVt/image.png" width="30%"> <img src="https://i.ibb.co/Jc32DpQ/image.png" width="30%">

The initial configuration of the wallet is very simple, it only requires setting a PIN and creating the wallet mnemonic.

<img src="https://i.ibb.co/1YCsyY3/Screenshot-20230205-021058.png" width="30%"> <img src="https://i.ibb.co/QjP0Xcs/Screenshot-20230205-021115.png" width="30%"> <img src="https://i.ibb.co/941QpnH/Screenshot-20230205-021140.png" width="30%">

The most important part of our app is the lending section, since with this section we can generate our contract and upload our files through [Lighthouse](#lighthouse) in order to receive a loan and the contract that we display to make a loan is [SMB-Contract](./Contracts/SMB-Contract.sol)

NOTE: the deployed contract has some attributes of an [Abstraction Wallet](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a), since the contract will always have the funds and any movement of money must be made by the client or by the owner.

<img src="https://i.ibb.co/bWb1p0X/Screenshot-20230205-023324.png" width="30%"> <img src="https://i.ibb.co/Jn6m20d/Screenshot-20230205-023349.png" width="30%"> <img src="https://i.ibb.co/7Nybv8v/Screenshot-20230205-023410.png" width="30%">

# SMB Lending Web App:

Our web platform allows the owner of the loan company to review and manage the contracts as deemed necessary. All contracts and their registration are in the smart contract [SMB Register](./Contracts/SMB-Register.sol).

<img src="https://i.ibb.co/dgzrpmz/image.png">

## Risk:

To calculate the risk of investing in a company, which is essential to know if the loan will be made or not, it will be the following.

    calculateRisk(id, enterprise, balance, year = 0) {
            let number = 
              100 - 20 * id   // Check if the ID is available
            - 20 * enterprise // Check if the Enterprise Document is available
            - 30 * (balance > 100 ? 1 : balance / 100) // Check Client Collateral
            - 30 * (year >= 3 ? 1 : year / 3)// Check incorporation date
            return number
        }

<img src="https://i.ibb.co/h7T2p1M/image.png">

This algorithm is not limited to working with only this data, it can be as complicated as required.

## Pending Contracts:

In the case of pending contracts, we can see the following information.

<img src="https://i.ibb.co/h7T2p1M/image.png">

- Address: The address of the wallet that is making the loan request
- Contract: The contract to which the loan will be sent
- Amount: The amount in USDC that the user requests
- USDC Collateral: The collateral "money" that the client will give as "insurance" to the loan
- Documents: business documents required to prevent fraud.
- Years: the number of years the company is
- IR: the percentage of interest that will be requested for the loan according to the risk.
- Risk: the percentage of risk of making the investment to that company.
- Contract Control: With these buttons the loan request is accepted or rejected.

All interactions with the smart contract must be signed through metamask with the wallet of the owner of the company.

<img src="https://i.ibb.co/hfybXgH/image.png">

## Active Contracts:

In the case of active contracts we will be able to see almost the same information, however we will already be able to see the balance that the contract has at all times, the client's collateral and the money that he borrowed at the beginning.

<img src="https://i.ibb.co/M7TGF1Y/image.png">

- USDC Amount: The amount in USDC that the user requested at the beginning.
- USDC Collateral: The collateral of money that the client will give as "insurance" to the loan.
- USDC Contract: the USDC balance that the contract currently has.
- Contract Control: With the complete button, we will be able to recover our investment once the contract has the equivalent of the money lent + the interest.

## Rejected Contracts:

For contracts that seemed too risky, the owner can simply reject them and leave you as historical.

<img src="https://i.ibb.co/9NDfS6W/image.png">

## Completed Contracts:

Finally, the owner can see the contracts that are already complete and what was the profit of making that loan.

<img src="https://i.ibb.co/WxtvJNM/image.png">

# Spheron:

All the deployment of our application, CI/CD cycle and above all the hosting, is provided by Spheron.

## Deployment:

The deployment of our application was done with its build and deploy system, with the ReactJS Framework in the NodeV16 version. The advantage of using this system is that every time we push to our repository, the platform deploys the changes instantly.

<img src="https://i.ibb.co/H7HG7GN/image.png">

## Hosting: 

An important part of our project was to have our own domain, so we bought a domain from godaddy and configured it in our application to configure the DNS towards it.

<img src="https://i.ibb.co/H4fGRgr/image.png">

In turn, the application to upload files through Lighthouse is also hosted as a subdomain of this page.

<img src="https://i.ibb.co/sWc28j1/image.png">

# Lighthouse: 

<img src="https://i.ibb.co/f47fhVX/image.png">

## Mobile:

In order to upload the files to Lighthouse, the [@lighthouse-web3/sdk](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/overview) was used, integrating into a PWA for mobiles so that during the stage of creation of the [SMB Contract](/Contracts/SMB-Contract.sol) the files could be uploaded directly to the contract as CID's.

URL: https://light.smb-lending.services/

<img src="https://i.ibb.co/7Nybv8v/Screenshot-20230205-023410.png" width="30%">

This implementation is in the following file on the web page.

- [Upload Files](/Upload%20File%20Platform%20Code/src/lighthouse/lighthouse.js)

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

## Webapp:

These files can also be accessed by the website using the Gateway provided by Lighthouse.

This implementation is in the following file on the web page.

- [Active Tab](Lending%20Platform%20Code/src/menu/active.js)
- [Pending Tab](Lending%20Platform%20Code/src/menu/pending.js)
- [Rejected Tab](Lending%20Platform%20Code/src/menu/rejected.js)
- [Completed Tab](Lending%20Platform%20Code/src/menu/completed.js)

      function getLinks(cids) {
          const links = {
              id: 'https://gateway.lighthouse.storage/ipfs/' + cids[0],
              enterprise: 'https://gateway.lighthouse.storage/ipfs/' + cids[1],
              logo: 'https://gateway.lighthouse.storage/ipfs/' + cids[2],
          }
          return links
      }



# Team:

#### 3 Engineers with experience developing Blockchain, IoT, AI and hardware solutions. We have been working together now for 5 years since University.

[<img src="https://img.shields.io/badge/Luis%20Eduardo-Arevalo%20Oliver-blue">](https://www.linkedin.com/in/luis-eduardo-arevalo-oliver-989703122/)

[<img src="https://img.shields.io/badge/Victor%20Alonso-Altamirano%20Izquierdo-lightgrey">](https://www.linkedin.com/in/alejandro-s%C3%A1nchez-guti%C3%A9rrez-11105a157/)

[<img src="https://img.shields.io/badge/Alejandro-Sanchez%20Gutierrez-red">](https://www.linkedin.com/in/victor-alonso-altamirano-izquierdo-311437137/)
 
# References:

- Konfio - https://konfio.mx/mi/registro/

- Financiera Fuerza Unidos - https://www.financierafuerzaunidos.com/ 

- Creze - https://www.creze.com/credito/leadfunnel_step1

- Creditas - https://www.creditas.mx/prestamo/garantia-auto

- Kapital - https://solucionempresarial.kapital.mx/creditosimplemx

- BBVA - https://www.bbva.mx/empresas/productos/financiamiento/creditos-a-corto-y-largo-plazo/credito-pyme.html

- Yotepresto - https://www.yotepresto.com/prestamos-personales

- Tribal - https://beta.tribal.credit/join?lang=es

- Rice Business: - https://www.bakerinstitute.org/research/improving-small-business-lending-blockchain-technology

- The FVM Imaginarium Part 1 - https://www.youtube.com/watch?v=TOUzzTcH6O4 

- The FVM Imaginarium Part 2 - https://www.youtube.com/watch?v=VyiOopl7Tj8 
