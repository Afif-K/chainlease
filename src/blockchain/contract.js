import { ethers } from "ethers";

export const ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_rentAmount", type: "uint256" },
      { internalType: "string", name: "_ipfsHash", type: "string" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ipfsHash",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isSigned",
    outputs: [{ type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "landlord",
    outputs: [{ type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "payRent",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "rentAmount",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "signLease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "tenant",
    outputs: [{ type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];

// your bytecode remains same
const BYTECODE = "YOUR_FULL_BYTECODE_HERE";

// ✅ YOUR DEPLOYED CONTRACT ADDRESS
const CONTRACT_ADDRESS = "0x3b8FD1512De284A3E1eB95f60544e853f5C02E47";

// 🔗 CONNECT WALLET
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Install MetaMask");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  // ✅ Create contract instance here
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signer
  );

  // ✅ Fetch contract state
  const signed = await contract.isSigned();
  const rentValue = await contract.rentAmount();

  return {
    address,
    contract,
    isSigned: signed,
    rent: ethers.formatEther(rentValue)
  };
}

// 🚀 DEPLOY NEW CONTRACT
export async function deployLeaseContract(rent, ipfsHash = "") {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = new ethers.ContractFactory(
    ABI,
    BYTECODE,
    signer
  );

  const rentInWei = ethers.parseEther(rent.toString());

  const contract = await factory.deploy(
    rentInWei,
    ipfsHash
  );

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  return contractAddress;
}

// ✍️ SIGN LEASE
export async function signLease(contractAddress) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    ABI,
    signer
  );

  const tx = await contract.signLease();
  await tx.wait();
}

// 💰 PAY RENT
export async function payRent(contractAddress) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    ABI,
    signer
  );

  const rent = await contract.rentAmount();

  const tx = await contract.payRent({
    value: rent
  });

  await tx.wait();
}