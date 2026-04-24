import axios from "axios";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NTBkMjJmZC0xYzIxLTQ3OGMtYTRhMi0wYTE3OWUzNTY5ZmYiLCJlbWFpbCI6ImthcnRpa3R5YWdpOTgyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxZGUyZGMxNGMxYmJmY2ZmNTU4ZCIsInNjb3BlZEtleVNlY3JldCI6IjljZTk2MzU0NTBjMDZlZTJjYTdlYjczYThlNDAyODA4NTMxOGMzYWU2N2VhMjQ3NWFhNzMzMGQzM2ExYWZhZDUiLCJleHAiOjE4MDg1Nzg1NDR9.ng-nZO3pwNCPd7lPvmkNS_ZoUKz-1ltoPAV1RXgz1Xk";

export async function uploadToIPFS(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return response.data.IpfsHash;

  } catch (error) {
    console.error("Pinata Upload Error:", error);
    throw new Error("IPFS Upload Failed");
  }
}