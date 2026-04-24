import { useState } from "react";
import { deployLeaseContract } from "../blockchain/contract";
import { uploadToIPFS } from "../blockchain/ipfs";
import { useNavigate } from "react-router-dom";

function CreateListing({ addListing }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [leaseFile, setLeaseFile] = useState(null);
  const [propertyImage, setPropertyImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !title ||
      !rent ||
      !description ||
      !leaseFile ||
      !propertyImage
    ) {
      alert("Please fill all fields and upload files");
      return;
    }

    try {
      setLoading(true);

      // Lease PDF → IPFS
      const ipfsHash = await uploadToIPFS(leaseFile);

      // Contract deploy
      const contractAddress = await deployLeaseContract(
        rent,
        ipfsHash
      );

      const newListing = {
        id: Date.now(),
        title,
        rent,
        description,
        contractAddress,
        ipfsHash,
        createdAt: new Date().toLocaleString(),

        // Status
        paymentStatus: "Pending",
        leaseStatus: "Unsigned",

        // Image preview
        imageUrl: URL.createObjectURL(propertyImage),
      };

      addListing(newListing);

      alert("Listing created successfully!");

      navigate("/listings");

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Create New Property Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Monthly Rent (BNB)"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows="4"
          placeholder="Property Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <div>
          <label className="font-medium">
            Upload Lease Agreement (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setLeaseFile(e.target.files[0])}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Upload Property Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPropertyImage(e.target.files[0])}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>

      </form>
    </div>
  );
}

export default CreateListing;