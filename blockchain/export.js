// import Web3 from 'web3'

// const provider = new Web3.providers.HttpProvider(
//   'https://rinkeby.infura.io/v3/e01b0dc3251f4afb834c0532f1bb6e62',
// )

// const web3 = new Web3(provider)

const abi = [
  {
    inputs: [],
    name: 'acceptEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'greeting',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: 'recipient', type: 'address' },
    ],
    name: 'pay',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: 'recipient', type: 'address' },
    ],
    name: 'pay2',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'speak',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
]

const exchangeContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    '0xaC69A332Cce33b1CD443624926977E81C76F8D72',
  )
}

export default exchangeContract
