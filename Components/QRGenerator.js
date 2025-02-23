// components/QRGenerator.js
import React, { useState } from "react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  
  const [color, setColor] = useState("#000000"); // Default QR code color
  const [size, setSize] = useState(1000); // Default QR code size
  const [showResult, setShowResult] = useState(false); // Toggle between input and result layouts

  // Function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const generateQRCode = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: size,
        color: {
          dark: color, // QR code color
          light: "#ffffff", // Background color
        },
      });
      setQrCode(dataUrl);
      setShowResult(true); // Show the result layout
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  const resetGenerator = () => {
    setUrl("");
    setQrCode("");
    setShowResult(false); // Revert to the input layout
  };

  return (
    <div className="  w-full md:w-3/6  p-8 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        QR Code Generator
      </h2>

      {/* Input Layout (Hidden when result is shown) */}
      {!showResult && (
        <>
          {/* URL Input */}
          <div className="mb-6">
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your link here
            </label>
            <input
              type="text"
              id="url-input"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Customization Options */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="color-picker" className="text-sm font-medium text-gray-700">
                QR Code Color:
              </label>
              <input
                type="color"
                id="color-picker"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="size-input" className="text-sm font-medium text-gray-700">
                QR Code Size:
              </label>
              <input
                type="number"
                id="size-input"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                min="100"
                max="500"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateQRCode}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </div>
            ) : (
              "Generate QR Code"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-center text-sm">
              {error}
            </div>
          )}
        </>
      )}

      {/* Result Layout (Shown after QR code is generated) */}
      {showResult && (
        <div className="flex flex-col items-center">
          {/* QR Code Display */}
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <img
              src={qrCode}
              alt="QR Code"
              className="rounded-lg"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={downloadQRCode}
            className="mt-4 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition duration-300"
          >
            Download QR Code
          </button>

          {/* Generate Again Button */}
          <button
            onClick={resetGenerator}
            className="mt-4 w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition duration-300"
          >
            Generate Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;