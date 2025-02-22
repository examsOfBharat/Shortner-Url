// pages/qr-generator.js
import React from "react";
import QRGenerator from "../../Components/QRGenerator";

const QRGeneratorPage = () => {
  return (
    <div className="relative w-full md:h-screen flex flex-col md:flex-row lg:flex-row justify-evenly items-center p-6 lg:p-8 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400">
      <QRGenerator />
    </div>
  );
};

export default QRGeneratorPage;