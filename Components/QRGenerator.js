import React, { useState } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MdQrCode, MdDownload, MdRefresh, MdColorLens, MdLink, 
  MdWifi, MdEmail, MdTextFormat, MdVisibility, MdVisibilityOff 
} from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";

const QRGenerator = () => {
  // Mode State: 'url', 'wifi', 'email', 'text'
  const [mode, setMode] = useState("url");
  
  // Input States
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  
  // WiFi State
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  // Email State
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Common State
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [color, setColor] = useState("#000000"); 
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showResult, setShowResult] = useState(false); 

  const generateQRCode = async () => {
    setError("");
    let finalData = "";

    // Validation & Data Construction
    if (mode === "url") {
      if (!url.trim()) return setError("Please enter a valid URL.");
      try { new URL(url); } catch { return setError("Please enter a valid URL (include http/https)."); }
      finalData = url;
    } 
    else if (mode === "wifi") {
      if (!wifiSsid.trim()) return setError("Network name (SSID) is required.");
      // WIFI:S:<SSID>;T:<WEP|WPA|nopass>;P:<PASSWORD>;H:<true|false>;;
      finalData = `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden};;`;
    } 
    else if (mode === "email") {
      if (!emailTo.trim()) return setError("Recipient email is required.");
      finalData = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    } 
    else if (mode === "text") {
      if (!text.trim()) return setError("Please enter some text.");
      finalData = text;
    }

    setIsLoading(true);
    // Simulate delay for UX
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const dataUrl = await QRCode.toDataURL(finalData, {
        width: 1000,
        margin: 2,
        color: { dark: color, light: bgColor },
      });
      setQrCode(dataUrl);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      setError("Failed to generate QR code.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qrcode-${mode}-${Date.now()}.png`;
    link.click();
  };

  const resetGenerator = () => {
    setShowResult(false);
    setError("");
  };

  // Mode Selection Tabs
  const tabs = [
    { id: "url", icon: <MdLink />, label: "URL" },
    { id: "wifi", icon: <MdWifi />, label: "Wi-Fi" },
    { id: "email", icon: <MdEmail />, label: "Email" },
    { id: "text", icon: <MdTextFormat />, label: "Text" },
  ];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, layout: { duration: 0.3 } }}
      className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <motion.div layout className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          Smart <span className="text-gradient">QR Generator</span>
        </h2>
        <p className="text-gray-400 text-sm">Select a mode to generate your custom QR code.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            layout
            key="input-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mode Selector */}
            <div className="grid grid-cols-4 gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setMode(tab.id); setError(""); }}
                  className="relative flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  {mode === tab.id && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-primary-600 rounded-xl shadow-lg shadow-primary-500/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 text-xl ${mode === tab.id ? "text-white" : "text-gray-400"}`}>{tab.icon}</span>
                  <span className={`relative z-10 hidden sm:inline ${mode === tab.id ? "text-white" : "text-gray-400"}`}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Input Fields based on Mode - Animated Switch */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {mode === "url" && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Website URL</label>
                      <input
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  )}

                  {mode === "wifi" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Network Name (SSID)</label>
                        <input
                          type="text"
                          placeholder="MyHomeWiFi"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Password</label>
                            <div className="relative">
                                <input
                                  type={showWifiPassword ? "text" : "password"}
                                  placeholder="WiFi Password"
                                  value={wifiPassword}
                                  onChange={(e) => setWifiPassword(e.target.value)}
                                  className="input-field pr-10"
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                  {showWifiPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Encryption</label>
                          <select 
                            value={wifiEncryption} 
                            onChange={(e) => setWifiEncryption(e.target.value)}
                            className="input-field appearance-none"
                          >
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">No Password</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === "email" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Recipient Email</label>
                        <input
                          type="email"
                          placeholder="friend@example.com"
                          value={emailTo}
                          onChange={(e) => setEmailTo(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Subject</label>
                        <input
                          type="text"
                          placeholder="Meeting Reminder"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Message Body</label>
                        <textarea
                          placeholder="Hello, I wanted to reach out regarding..."
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          className="input-field h-24 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {mode === "text" && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Plain Text</label>
                      <textarea
                        placeholder="Enter any text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="input-field h-32 resize-none"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Color Pickers (Collapsed by default layout logic, simplified here) */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
               <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <MdColorLens className="text-gray-400" />
                  <span className="text-gray-400 text-xs uppercase">QR Color</span>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0" />
               </div>
               <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <MdColorLens className="text-gray-400" />
                  <span className="text-gray-400 text-xs uppercase">Background</span>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0" />
               </div>
            </div>

            {/* Error & Button */}
            {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-sm text-center mb-4 font-medium">{error}</motion.div>}
            
            <button
              onClick={generateQRCode}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-500/10 transition-all ${
                isLoading ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 hover:scale-[1.01]"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2"><BiLoaderAlt className="animate-spin text-xl" /> Generating...</div>
              ) : (
                <div className="flex justify-center items-center gap-2"><MdQrCode className="text-xl" /> Generate QR Code</div>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            key="result-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="p-4 bg-white rounded-2xl shadow-xl border border-white/10 mb-8 max-w-[280px]">
              <img src={qrCode} alt="Generated QR" className="rounded-xl w-full h-auto" />
            </div>
            
            <div className="w-full space-y-3">
              <button
                onClick={downloadQRCode}
                className="w-full py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 transition-all flex items-center justify-center gap-2"
              >
                <MdDownload /> Download PNG
              </button>
              <button
                onClick={resetGenerator}
                className="w-full py-3 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MdRefresh /> Create Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QRGenerator;
