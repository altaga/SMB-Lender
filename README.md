
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](pending)

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

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](pending)

# Introduction and Problem:



# Solution:

SMB lender es una plataforma integral de prestamos sobre la FEVM totalmente on Chain. Contamos con nuestra propia wallet FEVM como aplicacion nativa de android, compatible con todas las operaciones de Filecoin y ERC20 tokens, ademas de la gestion de los prestamos solicitados a travez del control del smart contract afiliado a esta wallet, ademas de la capacidad de compartir los archivos del KYC mediante lighthouse y poder facilitar al prestamista la aprovacion del prestamo. Ademas una plataforma web para el prestamista, desplegada con Sphereon y donde puede gestionar los smart contracts de el dinero prestado y ganancias del negocio.

# System's Architecture:

<img src="https://i.ibb.co/47ndFtL/scheme.png">

- Filecoin EVM: Todas las transacciones, assets y smart contracts estan sobre la Hyperspace Filecoin EVM.
  
- Spheron: en esta plataforma tenemos toda la gestion del despliegue y hosting de nuestro sitio web.
  
- Lighthouse: con este servicio de web3 realizamos la gestion y subida de archivos a la red de IPFS.

# SMB React Natve App:

Para que un cliente pueda hacer uso de nuestros servicios de lending, primero debera bajar nuestra aplicacion SMB Wallet, la cual es una wallet 100% funcional basada completamente en la red Filecoin EVM y lista para funcionar con los ERC20 tokens que vaya a tener la red e su lanzamiento, todos los valores de las tokens se obtienen en tiempo real desde la API de CoinGecko.

NOTA: ya que Filecoin EVM no tiene una lista de ERC20 ya reconocida, nosotros generamos dos tokens de prueba para mostrar la completa fnucionalidad de la red con tokens.

SMB Token Address: 0x53d3b22E7548C2088785D0A87F1174d3818AB90b
USDC (test) Token: 0xc1908C35eF76b7642e20e650EC9274Ab5FA68c84

<img src="https://i.ibb.co/YPbDYpP/image.png" width="30%"> <img src="https://i.ibb.co/JBNFHVt/image.png" width="30%"> <img src="https://i.ibb.co/Jc32DpQ/image.png" width="30%">

La configuracion inicial de la wallet es muy sencilla, solo requiere configurar un PIN y relizar la creacion del mnemonico de la wallet.

<img src="https://i.ibb.co/1YCsyY3/Screenshot-20230205-021058.png" width="30%"> <img src="https://i.ibb.co/QjP0Xcs/Screenshot-20230205-021115.png" width="30%"> <img src="https://i.ibb.co/941QpnH/Screenshot-20230205-021140.png" width="30%">

La parte mas importante de nuestra app es la seccion de lending, ya que con esta seccion podremos generar nuestro contrato y subir nuestros archivos mediante [Lighthouse](#lighthouse) para poder recibir un prestamo y el contrato que desplegamos para realizar un prestamo es [SMB-Contract](./Contracts/SMB-Contract.sol)

NOTA: el contrato desplegado tiene algunos atributos de una [Abstraction Wallet](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a), ya que siempre el contrato va a tener los fondos y cualquier movimiento de dinero debe ser echo por el cliente o por el owner.

<img src="https://i.ibb.co/bWb1p0X/Screenshot-20230205-023324.png" width="30%"> <img src="https://i.ibb.co/Jn6m20d/Screenshot-20230205-023349.png" width="30%"> <img src="https://i.ibb.co/7Nybv8v/Screenshot-20230205-023410.png" width="30%">

# SMB Lending Web App:

Nuestra plataforma web nos permite que el dueño de la empresa de prestamos, pueda revisar y manejar los contratos segun se considere. Todos los contratos y registro de los mismos estan en el smart contract [SMB Register](./Contracts/SMB-Register.sol).

<img src="https://i.ibb.co/dgzrpmz/image.png">

## Risk:

Para hacer el calculo del riesgo de invertir en una empresa, lo cual es indispensable para saber si se hara o no el prestamo, sera el siguiente.

    calculateRisk(id, enterprise, balance, year = 0) {
            let number = 
              100 - 20 * id   // Check if the ID is available
            - 20 * enterprise // Check if the Enterprise Document is available
            - 30 * (balance > 100 ? 1 : balance / 100) // Check Client Collateral
            - 30 * (year >= 3 ? 1 : year / 3)// Check incorporation date
            return number
        }

<img src="https://i.ibb.co/h7T2p1M/image.png">

Este algoritmo no se limita a funcionar con solo estos datos, puede complicarse tanto como se requiera.

## Pending Contracts:

En el caso de los contratos pendientes, podremos ver la siguiente informacion.

<img src="https://i.ibb.co/h7T2p1M/image.png">

- Address: El address de la wallet que esta haciendo la peticion del prestamo
- Contract: El contrato al cual se mandara el prestamo
- Amount: La cantidad en USDC que pide el usuario
- USDC Collateral: El colateral de dinero que dara el cliente como "seguro" al prestamo
- Documents: los documentos empresariales que se piden para evitar el fraude.
- Years: la cantidad de años que tiene la empresa
- IR: el porcentaje de interes que se pedira por el prestamo segun el riesgo.
- Risk: el porcentaje de riesgo de realizar la inversion a esa empresa.
- Contract Control: Con estos botones se acepta o se rechaza la peticion de prestamo.

Todos las interacciones con el smart contract deben de ser firmadas mediante metamask con la wallet del dueño de la empresa.

<img src="https://i.ibb.co/hfybXgH/image.png">

## Active Contracts:

En el caso de los contratos activos podremos ver casi la misma informacion, sin embargo ya podremo ver el saldo que tiene en todo momento el contrato, el colteral del cliente y el dinero que pidio prestado en un inicio.

<img src="https://i.ibb.co/M7TGF1Y/image.png">

- USDC Amount: La cantidad en USDC que pidio el usuario al inicio.
- USDC Collateral: El colateral de dinero que dara el cliente como "seguro" al prestamo.
- USDC Contract: el balance de USDC que tiene el contrato en este momento.
- Contract Control: Con el boton de completar, podremos recuperar nuestra inversion una vez el contrato tenga el equivalente al dinero prestado + el interes.

## Rejected Contracts:

Para los contratos que parecian ser un riesgo muy grande, el owner puede simplemente rechazarlos y dejaros como historico.

<img src="https://i.ibb.co/9NDfS6W/image.png">

## Completed Contracts:

Por ultimo el owner puede ver los contratos que ya estan completos y cual fue la ganancia de relizar ese prestamo.

<img src="https://i.ibb.co/WxtvJNM/image.png">

# Spheron:

Todo el despliegue de nuestra aplicacion, ciclo de CI/CD y sobre todo el hosting, esta proporcionado por Spheron.

## Deployment:

El despliegue de nuestra aplicacion se realizo con su sistema de build and deploy, con el Framework de ReactJS en la version NodeV16. La ventaja de usar este sistema es que cada vez que realizamos un push a nuestro repositorio, la plataforma despliega los cambios al instante.

<img src="https://i.ibb.co/H7HG7GN/image.png">

## Hosting: 

Una parte importante de nuestro proyecto era tener nuestra propio dominio, asi que se realizo la compra de un dominio en godaddy y se configuro en nuestra aplicacion para configurar los DNS hacia ella.

<img src="https://i.ibb.co/H4fGRgr/image.png">

A su vez la aplicacion para subir archivos mediante Lighthouse esta tambien hosteada como subdominio de esta pagina.

<img src="https://i.ibb.co/sWc28j1/image.png">

# Lighthouse: 

## Mobile:

Para poder subir los archivos a Lighthouse se utilizo el [@lighthouse-web3/sdk](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/overview) integrando en una PWA en para mobiles para que durante la etapa de creacion del [SMB Contract](/Contracts/SMB-Contract.sol) los archivos pudieran ser subidos directo al contrato como CID's.

URL: https://light.smb-lending.services/

<img src="https://i.ibb.co/7Nybv8v/Screenshot-20230205-023410.png" width="30%">

Esta implementacion esta en el siguiente archivo de la pagina web.

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

Estos archivos pueden ser concultados tambien por la pagina web usando el Gateway proporcionado por Lighthouse.

Esta implementacion esta en el siguiente archivo de la pagina web.

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

# Current state and what's next:

TO DO...

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