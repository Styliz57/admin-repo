'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Upload = ({ onClose }) => {
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleUpload = () => {
    if (!fileName || !fileUrl) return;

    const fileData = {
      fileName,
      fileUrl,
    };

    let uploadedFiles = Cookies.get('uploadedFiles');
    uploadedFiles = uploadedFiles ? JSON.parse(uploadedFiles) : [];

    uploadedFiles.push(fileData);
    Cookies.set('uploadedFiles', JSON.stringify(uploadedFiles));

    setFileName('');
    setFileUrl('');
    onClose(); // Close the upload component after upload
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>
        <input
          type="text"
          placeholder="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white p-2 rounded-md w-full"
        >
          Upload
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-red-600 p-2 rounded-md w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Upload;
