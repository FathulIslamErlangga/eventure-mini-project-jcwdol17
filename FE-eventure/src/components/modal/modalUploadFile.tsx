"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { transactionResponse } from "@/utils/interfaces/customInsterface";
import {
  updateStatusPayment,
  uploadPaymentProof,
} from "@/services/transactions.services";

interface ModalUploadFileProps {
  onClose: () => void;
  queryParam?: string;
  status?: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  // Add other fields as necessary based on the actual response structure
}

export function ModalUploadFile({
  onClose,
  queryParam,
  status,
}: ModalUploadFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      console.log("Query Param:", queryParam);

      if (selectedFile) {
        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error("Only image files (JPEG, PNG, JPG, GIF) are allowed.");
          event.target.value = ""; // Clear the file input
          setFile(null);
          return;
        }

        // Validate file size (optional, limit to 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
          toast.error("File size should not exceed 5MB.");
          event.target.value = ""; // Clear the file input
          setFile(null);
          return;
        }

        setFile(selectedFile);
      }
    }
  };

  // New state for upload status

  // useEffect to handle status update after upload
  useEffect(() => {
    const updateStatus = async () => {
      if (uploadSuccessful && queryParam && status) {
        await updateStatusPayment(queryParam, status); 
        
        // Pass queryParam here
        toast.success("Transaction status updated successfully!");
      }
    };

    updateStatus();
  }, [uploadSuccessful, queryParam, status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("payment", file);

      try {
        const response: transactionResponse = await uploadPaymentProof(file);
        console.log("Upload response:", response);

        if (response.data) {
          setUploadSuccessful(true); // Set upload status to true on successful upload
          toast.success("Upload successful!", {
            onClose: () => onClose(), // Optional: close modal after toast disappears
          });
        } else {
          toast.error("No transaction found to update.");
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        toast.error(
          err.response?.data?.message ||
            "Failed to upload proof of payment. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="emodal3">
      <div className="emodal2-content">
        <div className="emodal-close">
          <div className="emodal-btn-close" onClick={onClose}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="emodal-title">
          <span>Upload Proof of Payment</span>
        </div>
        <form className="eventure-form" onSubmit={handleSubmit}>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Pick a Proof of Payment</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
              onChange={handleFileChange} // Handle file change
            />
          </label>

          <button
            className={
              loading
                ? "eventure-button cursor-wait opacity-50"
                : "eventure-button"
            }
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"} {/* Show loading text */}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right"/>{" "}
      {/* Use ToastContainer to display toast notifications */}
    </div>
  );
}
