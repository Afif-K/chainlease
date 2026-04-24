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

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

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

      const ipfsHash = await uploadToIPFS(leaseFile);

      const contractAddress = await deployLeaseContract(
        rent,
        ipfsHash
      );

      const imageBase64 = await convertToBase64(propertyImage);

      const newListing = {
        id: Date.now(),
        title,
        rent,
        description,
        contractAddress,
        ipfsHash,
        createdAt: new Date().toLocaleString(),
        paymentStatus: "Pending",
        leaseStatus: "Unsigned",
        imageUrl: imageBase64,
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
    <div className="max-w-3xl mx-auto bg-[#fffdf9] border border-[#eadbc8] rounded-[32px] shadow-xl p-10">

      <h2
        className="mb-8 text-center"
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "42px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Create New Property Listing
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-[#d8c3a5] rounded-2xl p-4 bg-white outline-none focus:border-[#8B5E3C]"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        />

        <input
          type="number"
          placeholder="Monthly Rent (BNB)"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full border border-[#d8c3a5] rounded-2xl p-4 bg-white outline-none focus:border-[#8B5E3C]"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        />

        <textarea
          rows="5"
          placeholder="Property Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-[#d8c3a5] rounded-2xl p-4 bg-white outline-none focus:border-[#8B5E3C]"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        />

        <div>
          <label
            className="block mb-3 font-medium text-[#4b2e1f]"
            style={{
              fontFamily: "Poppins, sans-serif"
            }}
          >
            Upload Lease Agreement (PDF)
          </label>

          <label className="flex items-center justify-between border border-[#d8c3a5] rounded-2xl px-5 py-4 bg-white cursor-pointer hover:border-[#8B5E3C] transition">
            <span
              className="text-gray-600"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              {leaseFile ? leaseFile.name : "Select PDF File"}
            </span>

            <span className="bg-[#8B5E3C] text-white px-5 py-2 rounded-xl text-sm">
              Choose File
            </span>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setLeaseFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label
            className="block mb-3 font-medium text-[#4b2e1f]"
            style={{
              fontFamily: "Poppins, sans-serif"
            }}
          >
            Upload Property Image
          </label>

          <label className="flex items-center justify-between border border-[#d8c3a5] rounded-2xl px-5 py-4 bg-white cursor-pointer hover:border-[#8B5E3C] transition">
            <span
              className="text-gray-600"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              {propertyImage ? propertyImage.name : "Select Property Image"}
            </span>

            <span className="bg-[#8B5E3C] text-white px-5 py-2 rounded-xl text-sm">
              Choose Image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPropertyImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4b2e1f] hover:bg-[#2d1f16] text-white py-4 rounded-2xl text-lg font-semibold transition cursor-pointer shadow-md"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        >
          {loading ? "Creating Listing..." : "Create Listing"}
        </button>

      </form>
    </div>
  );
}

export default CreateListing;