import Head from 'next/head'
import styles from '../styles/Home.module.css'
import '../styles/helloWorld.module.css'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import hwContract from '../blockchain/export.js'

const HelloWorld = () => {
  let web3

  const hello = async () => {
    let a = await hwContract.methods.speak().call()
    console.log(a)
  }

  const connect = async () => {
    if (window !== 'undefined' && window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        web3 = new Web3(window.ethereum)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('install metamask')
    }
  }

  return (
    <div styles={styles.main}>
      <Head>
        <title>Hello World React-Solidity</title>
        <meta name="description" content="Hello World React-Solidity" />
      </Head>
      <nav className="navbar m-4">
        <div className="navbar-brand">
          <h1>Hello World</h1>
        </div>
        <div className="navbar-end">
          <button onClick={connect} className="button is-primary">
            Connect To Wallet
          </button>
        </div>
      </nav>
      <section>
        <div className="container m-4">
          <button onClick={hello} className="button is-primary">
            Hello
          </button>
        </div>
      </section>
      <div className="has-text-danger m-4">
        <p>Temp Text</p>
      </div>
    </div>
  )
}

export default HelloWorld
