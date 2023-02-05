
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](pending)

# SMB Lender
<img src="https://i.ibb.co/nfLMcJC/smb.png" width="60%">

<br>

Welcome, this is our project for [FVM Space Warp Hackathon](https://ethglobal.com/events/spacewarp).

# IMPORTANT!

## Application:

SMB Wallet APK: [LINK](https://www.coinbase.com/wallet)

SMB Platform: [LINK](./CoinPoint-ReactNative-Apk/app-release.apk)

## Here is our main demo video: 

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](pending)

# Introduction and Problem

Almost 4 years ago Vitálik Buterin, co founder of Ethereum posted in twitter this message:

<img src="https://i.ibb.co/ggfZWPD/vitalik.png">

At that time it grabbed the attention of almost the entire crypto space and the answers regarding that question were mostly a big “Not many if at all”. Of course, there have been isolated projects that try to work with the developed world with several big names attached, but not to much avail. Cryptocurrencies and blockchain technology from that time onwards has mostly been used by a few early adopters and some others, but were mostly already banked, educated people, even in the developing world. 

Now, let’s ask that same question today; How many unbanked have we banked by the year 2021? Despite having made great progress and having outliers like the country of El Salvador, outside of that, the progress is almost null. Most of the same people that are into crypto today have been in for years and are the same elite, educated, previously banked ones, it has not reached those who are not.   

We can say that because our team lives in one of those developing countries that countless projects try to portray as a target for financial inclusion, which is Mexico. 

And yes, Mexico is the perfect target as it is the largest issuer of remittances from the US and it will break $42Billion this year alone.  

<img src="https://cdn.howmuch.net/articles/outgoing-remittances-usa-final-8374.jpg" width="400">


Of course, remembering that the US is the biggest sender of remittances in the world.

It is important to mention that, according to the World Bank, 65% of Mexican adults do not have any type of bank account and only 10% save through a financial institution, in addition to the fact that 83% of Mexican adults do not have access to electronic payment systems. These circumstances limit the potential of the sector to place the resources of savers in productive projects that generate economic development and well-being for the population. And crypto is not doing better than the legacy system, most of the users are people like our team, tech savvy with a certain degree of education and already banked.

# Solution

CoinPoint is a cash out ramp and Point of Sale Superapp. We combine TradFi through Rapyd with Web3 to improve Financial Inclusion in Mexico and LATAM.

System's Architecture:

<img src="https://i.ibb.co/WVfDGZQ/scheme-drawio-1.png">

- All Ethereum transactions are controlled through [web3.js](https://web3js.readthedocs.io/en/v1.8.0/), [Coinbase Wallet SDK](https://www.coinbase.com/cloud/products/wallet-sdk) and [Coinbase Cloud Node](https://www.coinbase.com/cloud/products/node) on mainnet.

- Thanks to the Rapyd APIs we can manage users and KYC of our app. (https://www.rapyd.net/)

# Point of Sale application:

- The Point of Sale application is more focused on the simple reception of payments and an interface focused on generating payment orders through QR or NFC.

- The POS allows us to see the Crypto and Fiat balances received along with the list of transactions just like the Main App.

  <img src="https://i.ibb.co/YX3n6qY/001.png" width="32%">
  <img src="https://i.ibb.co/vZ52Ljy/002-1.png" width="32%">
  

- One of the most important processes is being able to make payments at the POS through Coinbase Wallet SDK, being this the pillar of our device.

  <img src="https://i.ibb.co/HtjVb0h/003.png" width="32%" >
  <img src="https://i.ibb.co/wSpST4K/004.png" width="32%">
  <img src="https://i.ibb.co/ph6S8QL/005.png" width="32%">

- When the reference is created by QR, it can be paid through any wallet compatible with Coinbase Wallet SDK, however our Main App also allows payment through NFC.

  - Main App / POS App:
  
    <img src="https://i.ibb.co/t2bb5wx/006.png" width="32%">
    <img src="https://i.ibb.co/gRNGBgg/007.png" width="32%">
    <img src="https://i.ibb.co/yBYNWfN/009.png" width="32%">

- Once the reference payment has been made, we will be able to see the confirmed and verified messages.

- In addition, we provide a printed receipt with the URL where you can check your transaction.

  <img src="https://i.ibb.co/cNC601b/010.png" width="32%">

- Let's print!

<img src="./Img/gifPrint.gif">

# Current state and what's next

This application is directed at those who cannot benefit directly from cryptocurrency. It has the usual, both crypto and fiat wallets, transfers between crypto and fiat, transfers between crypto accounts and it gives a spin on the cash in - cash out portion of the equation as no other project provides it. It is very important if this application is going to benefit and bank people to be very agile and compatible with FIAT at least until crypto reaches mass market. Most of the developed world has not even incorporated to legacy electronic systems. In addition to that the incorporation of a Point of Sale thought mainly for SMEs is something that can be key in augmenting the change for further adoption. 

I think we can make the jump from those systems almost directly to self-banking, such as the jump that was made in some parts of Africa and even here in Latin America from skipping telephone landlines directly to Mobile phones. If that jump was made from that type of technology this one can be analogous and possible. 

Perhaps the most important feedback we have obtained is that we have to show how our application will ensure the enforcement of anti-laundering laws. 

We will do that will strong KYC. And at the same time Mexico has published since 2018 strong laws to manage that including its fintech law.

https://en.legalparadox.com/post/the-definitive-guide-mexican-fintech-law-a-look-3-years-after-its-publication#:~:text=The%20Mexican%20FinTech%20Law%20was,as%20Artificial%20Intelligence%2C%20Blockchain%2C%20collaborative

Quoting: " The Mexican FinTech Law was one of the first regulatory bodies created specifically to promote innovation, the transformation of traditional banking and credit financial services that would even allow the possibility of incorporating exponential technology such as Artificial Intelligence, Blockchain, collaborative economies and peer-to-peer financial services in secure regulatory spaces. "

All of this was a silent revolution that happened in this jurisdiction after the HSBC money-laundering scandal that included cartels and some other nefarious individuals. 
https://www.investopedia.com/stock-analysis/2013/investing-news-for-jan-29-hsbcs-money-laundering-scandal-hbc-scbff-ing-cs-rbs0129.aspx

Thus, the need for Decentralized solutions.

Security and identity verification of the clients who use the app is paramount for us, and to thrive in this market we need this to emulate incumbents such as Bitso. We think our technology is mature enough if we compare with these incumbents and much safer. 

Regarding the application we would like to test it with real Capital perhaps in Q4 2022.

Hopefully you liked the Mobile DApp and Point of Sale.


# Team

#### 3 Engineers with experience developing IoT and hardware solutions. We have been working together now for 5 years since University.

[<img src="https://img.shields.io/badge/Luis%20Eduardo-Arevalo%20Oliver-blue">](https://www.linkedin.com/in/luis-eduardo-arevalo-oliver-989703122/)

[<img src="https://img.shields.io/badge/Victor%20Alonso-Altamirano%20Izquierdo-lightgrey">](https://www.linkedin.com/in/alejandro-s%C3%A1nchez-guti%C3%A9rrez-11105a157/)

[<img src="https://img.shields.io/badge/Alejandro-Sanchez%20Gutierrez-red">](https://www.linkedin.com/in/victor-alonso-altamirano-izquierdo-311437137/)
 
# References

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