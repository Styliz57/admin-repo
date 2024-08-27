'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CustomSelect from '@/app/_components/CustomSelect';
import Upload from '@/app/_components/Upload';
import Image from 'next/image';
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { course, institutions } from '@/constants';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

const Page = () => {
    const [folderName, setFolderName] = useState('');
    const [folderYear, setFolderYear] = useState('');
    const [selectedCourse, setSelectedCourse] = useState({ name: 'IIT-JEE' }); // Default value set for JEE
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [openSelect, setOpenSelect] = useState(null);
    const [resetSelect, setResetSelect] = useState(false);

    useEffect(() => {
        const fileData = Cookies.get('uploadedFiles');
        if (fileData) {
            setUploadedFiles(JSON.parse(fileData));
        }
    }, []);

    const handleSelectCourse = (option) => {
        setSelectedCourse(option);
        setOpenSelect(null);
    };

    const handleSelectInstitution = (option) => {
        setSelectedInstitution(option);
        setOpenSelect(null);
    };

    const handleToggleUpload = () => {
        setShowUpload((prev) => !prev);
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTag(e);
        }
    };

    const handleCloseUpload = () => {
        setShowUpload(false);
        const fileData = Cookies.get('uploadedFiles');
        if (fileData) {
            setUploadedFiles(JSON.parse(fileData));
        }
    };

    const handleSubmit = async () => {
        if (!folderName || !folderYear || !selectedCourse || !selectedInstitution || tags.length === 0) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const dataToSave = {
                folderName,
                folderYear,
                selectedCourse: selectedCourse.name,
                selectedInstitution: selectedInstitution.name,
                tags,
                uploadedFiles,
            };

            // Save data to Firestore
            await addDoc(collection(db, "jee"), dataToSave);

            toast.success('Data uploaded successfully!');

            // Clear form fields and reset dropdowns
            setFolderName('');
            setFolderYear('');
            setTags([]);
            setUploadedFiles([]);
            Cookies.remove('uploadedFiles');
            setResetSelect((prev) => !prev); // Trigger dropdown reset

        } catch (error) {
            toast.error('Failed to upload data.');
            console.error("Error uploading document: ", error);
        }
    };

    return (
        <div>

            <Toaster />

            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-6 relative">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                    <form className="flex flex-col gap-4 md:gap-6">
                        <input
                            type="text"
                            placeholder="Folder Name"
                            className="border border-gray-300 p-3 rounded-md w-full"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="border border-gray-300 p-3 rounded-md w-full"
                            placeholder='JEE'
                            disabled
                            value={'IIT-JEE'}
                        />
                        <CustomSelect
                            options={institutions}
                            placeholder="Select Institution"
                            isOpen={openSelect === 'institution'}
                            onToggle={() => setOpenSelect(openSelect === 'institution' ? null : 'institution')}
                            onSelect={handleSelectInstitution}
                            reset={resetSelect}
                        />
                        <input
                            type="number"
                            placeholder="Folder Year"
                            className="border border-gray-300 p-3 rounded-md w-full"
                            value={folderYear}
                            onChange={(e) => setFolderYear(e.target.value)}
                        />
                        <div className="w-full">
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 p-2 rounded-md">
                                        <span className="mr-2">{tag}</span>
                                        <IoMdCloseCircle
                                            size={20}
                                            className="cursor-pointer text-gray-600 hover:text-gray-800"
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add a tag and press Enter"
                                className="border border-gray-300 p-3 rounded-md w-full"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </form>
                    <div className="mt-6 flex justify-start">
                        <button className="relative" onClick={handleToggleUpload}>
                            <Image
                                src='/pdf.png'
                                width={100}
                                height={100}
                                alt='upload'
                                className='grayscale rounded-md shadow-sm'
                            />
                            <span className="absolute inset-0 flex items-center justify-center">
                                <IoMdAddCircle size={28} className="text-white opacity-90 hover:opacity-100" />
                            </span>
                        </button>
                    </div>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 flex items-center content-center justify-start gap-3">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <Link href={file.fileUrl} target="_blank" rel="noopener noreferrer" className='hover:bg-blue-100 p-2 rounded-md'>
                                        <Image
                                            src='/pdf.png'
                                            width={100}
                                            height={100}
                                            alt={file.fileName}
                                            className='rounded-md shadow-sm'
                                        />
                                        <p className="text-gray-700 mt-2 flex items-center content-center justify-center">{file.fileName}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {showUpload && (
                    <Upload onClose={handleCloseUpload} />
                )}
                <button
                    onClick={handleSubmit}
                    className="absolute bottom-4 right-4 bg-gray-900 rounded-md text-white p-2 px-4"
                >
                    Upload To Firestore
                </button>
            </div></div>
    );
};

export default Page;
