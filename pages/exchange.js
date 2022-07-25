import Head from 'next/head'
import styles from '../styles/Home.module.css'
import '../styles/helloWorld.module.css'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import exchangeContract from '../blockchain/export.js'
import { useState, useEffect } from 'react'

const Exchange = () => {
  let [senderAddress, setSenderAddress] = useState('')
  let [ethSent, setEthSent] = useState('')
  let [eContract, setEContract] = useState()
  let web3

  useEffect(() => {
    updateConnectWalletBtn()
    updateSendEthBtn()
  }, [])

  useEffect(() => {
    updateConnectWalletBtn()
    updateSendEthBtn()
  }, [senderAddress, ethSent])

  const updateConnectWalletBtn = () => {
    // check if there is a address saved in the senderAddress state / if someone
    // has logged on. Change text and color of the button acordingly
    let connectToWalletBtn = document.getElementById('connectToWalletBtn')
    let addressInput = document.getElementById('addressInput')
    let amountInput = document.getElementById('amountInput')
    let exchangeTip = document.getElementById('exchangeTip')
    if (senderAddress != '') {
      connectToWalletBtn.textContent = 'Connected'
      connectToWalletBtn.className = 'button is-primary'
      exchangeTip.textContent =
        "Enter the address and amount you'd like to send"
      addressInput.removeAttribute('disabled')
      amountInput.removeAttribute('disabled')
      sendEthBtn.removeAttribute('disabled')
    } else {
      connectToWalletBtn.textContent = 'Connect To Wallet'
      connectToWalletBtn.className = 'button is-danger'
      exchangeTip.textContent = `Please press the 'connect to wallet' button. *Metamask required`
      addressInput.setAttribute('disabled', 'disabled')
      amountInput.setAttribute('disabled', 'disabled')
      sendEthBtn.setAttribute('disabled', 'disabled')
    }
  }

  const updateSendEthBtn = () => {
    // check ethSent state. Change text and color of the button acordingly
    let connectToWalletBtn = document.getElementById('sendEthBtn')
    if (ethSent != '') {
      connectToWalletBtn.textContent = 'Sent'
      connectToWalletBtn.className = 'button is-primary mt-4'
    } else {
      connectToWalletBtn.textContent = 'Send'
      connectToWalletBtn.className = 'button is-danger mt-4'
    }
  }

  const sendEthHandler = async () => {
    let addressInput = document.getElementById('addressInput').value
    let amountInput = document.getElementById('amountInput').value

    let amountInWei = parseFloat(amountInput) * 1000000000000000000

    try {
      await eContract.methods.pay2(addressInput).send({
        from: senderAddress,
        value: amountInWei,
        gas: 300000,
        gasPrice: null,
      })
      updateState()
    } catch (err) {
      console.log(err.message)
    }
  }

  const connectToWalletHandler = async () => {
    if (window !== 'undefined' && window.ethereum !== 'undefined') {
      try {
        let _senderAddress = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        web3 = new Web3(window.ethereum)
        setSenderAddress(_senderAddress[0])

        const ec = exchangeContract(web3)
        setEContract(ec)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('install metamask')
    }
  }

  return (
    <div styles={styles.main}>
      <script src="https://unpkg.com/moralis@0.0.184/dist/moralis.js"></script>

      <Head>
        <title>Ethereum Exchange</title>
        <meta name="description" content="Ethereum Exchange" />
      </Head>
      <nav className="navbar m-4">
        <div className="navbar-brand">
          <h1>Ethereum Exchange</h1>
        </div>
        <div className="navbar-end">
          <button
            onClick={connectToWalletHandler}
            id="connectToWalletBtn"
            className="button"
          >
            Connect To Wallet
          </button>
        </div>
      </nav>
      <div className="columns is-mobile is-centered">
        <div className="column is-half m-4 ">
          <h1 id="exchangeTip" className="has-text-black-bis">
            Enter the address and amount you&apos;d like to send
          </h1>
          <input
            type="text"
            id="addressInput"
            className="input mt-4"
            placeholder="Address"
          />
          <br />
          <input
            type="text"
            id="amountInput"
            className="input mt-4"
            placeholder="Amount (in ether)"
          />

          <button
            onClick={sendEthHandler}
            id="sendEthBtn"
            className="button mt-4"
          >
            Send
          </button>
          <p className="has-text-danger mt-4">
            {/* 1 eth = 1000000000000000000 wei */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Exchange
