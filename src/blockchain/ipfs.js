import { Web3Storage } from "web3.storage";

// ⚠️ Replace with your real API token
const TOKEN = "PASTE_YOUR_WEB3_STORAGE_API_TOKEN";

function getAccessToken() {
  return TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({
    token: getAccessToken(),
  });
}

export async function uploadToIPFS(file) {
  try {
    const client = makeStorageClient();

    const cid = await client.put([file]);

    return cid;
  } catch (error) {
    console.error(error);
    throw new Error("IPFS upload failed");
  }
}