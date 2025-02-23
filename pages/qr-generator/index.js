// pages/qr-generator.js
import React from "react";
import QRGenerator from "../../Components/QRGenerator";

const QRGeneratorPage = () => {
  return (
    <>
          <div className="relative w-full h-screen flex flex-col md:flex-row lg:flex-row justify-evenly items-center p-6 lg:p-8 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400">
          <h1 className=" absolute top-10 text-5xl sm:text-6xl p-3 font-serif rounded-xl bg-gradient-to-r from-white via-white to-white text-transparent bg-clip-text font-bold text-center">
            QR Generator
          </h1>
      <QRGenerator />
    </div>
    </>
    
  );
};

export default QRGeneratorPage;