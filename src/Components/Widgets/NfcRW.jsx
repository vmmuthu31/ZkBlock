import React, { useState } from 'react';

const NFCComponent = () => {
  const [nfcMessage, setNfcMessage] = useState('');
  const [nfcReading, setNfcReading] = useState(false);
  const [nfcWriteText, setNfcWriteText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to read NFC tag
  const startReadingNFC = async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan(); // Start scanning NFC tags
        setNfcReading(true);

        ndef.onreadingerror = () => {
          setErrorMessage('Cannot read data from the NFC tag.');
        };

        ndef.onreading = (event) => {
          const message = event.message.records.map((record) => {
            return new TextDecoder(record.encoding).decode(record.data);
          });
          setNfcMessage(message.join('\n'));
        };
      } catch (error) {
        console.error('Error during NFC reading:', error);
        setErrorMessage('Error starting NFC scan: ' + error.message);
      }
    } else {
      setErrorMessage('NFC is not supported in this browser.');
    }
  };

  // Function to write to an NFC tag
  const writeToNFC = async () => {
    if ('NDEFWriter' in window) {
      try {
        const ndef = new window.NDEFWriter();
        await ndef.write(nfcWriteText); // Write the text to the NFC tag
        alert('Message written to NFC tag!');
      } catch (error) {
        console.error('Error during NFC writing:', error);
        setErrorMessage('Error writing to NFC: ' + error.message);
      }
    } else {
      setErrorMessage('NFC is not supported in this browser.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">NFC Reader/Writer</h1>
      
      {/* NFC Reading Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Read NFC Tag</h2>
        <button
          onClick={startReadingNFC}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Start NFC Scan
        </button>
        {nfcReading && <p className="text-blue-500 mt-4">Scanning for NFC tags... Please tap a tag.</p>}
        {nfcMessage && (
          <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800">NFC Tag Data:</h3>
            <pre className="text-gray-600">{nfcMessage}</pre>
          </div>
        )}
      </div>

      {/* NFC Writing Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Write to NFC Tag</h2>
        <textarea
          placeholder="Enter text to write to the NFC tag"
          value={nfcWriteText}
          onChange={(e) => setNfcWriteText(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <button
          onClick={writeToNFC}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Write to NFC Tag
        </button>
      </div>

      {/* Error Messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default NFCComponent;
