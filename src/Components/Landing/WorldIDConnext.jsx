import React from "react";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorldIDconnect({ userType, onSuccessCallback }) {
  const navigate = useNavigate();
  const app_id = "app_4a2e338845b3e7491199944e9d92efc5";
  const action = "gryffindors";
  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();

  const onSuccess = (result) => {
    console.log("Proof received from IDKit:\n", JSON.stringify(result));
    navigate("/lobby");
  };

  const handleProof = async (result) => {
    console.log("Proof received from IDKit:\n", JSON.stringify(result));
    navigate("/lobby");
  };

  return (
    <div>
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />
      <button
        className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setOpen(true)}
      >
        <div className="mx-3 my-1 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-white"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13.8 9a4 4 0 01-3.8 4h-1v3l-4-4 4-4v3h1a2 2 0 002-2V6a2 2 0 10-4 0H6a4 4 0 018 3z" />
          </svg>
          Verify with World ID
        </div>
      </button>
    </div>
  );
}

export default WorldIDconnect;
