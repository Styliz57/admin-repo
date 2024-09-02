import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import { institutions } from '@/constants';

const EditModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        folderName: initialData.folderName || '',
        folderYear: initialData.folderYear || '',
        selectedCourse: initialData.selectedCourse || '',
        selectedInstitution: initialData.selectedInstitution || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags : [], // Ensure tags are always an array
        uploadedFiles: initialData.uploadedFiles || [], // Ensure uploadedFiles is always an array
    });

    const [openSelect, setOpenSelect] = useState(null);
    const [resetSelect, setResetSelect] = useState(false);

    useEffect(() => {
        if (initialData.selectedInstitution) {
            setFormData((prevData) => ({
                ...prevData,
                selectedInstitution: institutions.find(
                    (inst) => inst.name === initialData.selectedInstitution
                ) || initialData.selectedInstitution,
            }));
        }
    }, [initialData.selectedInstitution]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData({ ...formData, tags: value.split(',').map(tag => tag.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSelectInstitution = (selectedInstitution) => {
        setFormData({ ...formData, selectedInstitution: selectedInstitution.value || selectedInstitution.name });
        setResetSelect(true);
    };

    const handleFileChange = (index, key, value) => {
        const updatedFiles = [...formData.uploadedFiles];
        updatedFiles[index][key] = value;
        setFormData({
            ...formData,
            uploadedFiles: updatedFiles,
        });
    };

    const handleAddFile = () => {
        const newFile = { fileName: '', fileUrl: '' };
        setFormData({
            ...formData,
            uploadedFiles: [...formData.uploadedFiles, newFile],
        });
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            uploadedFiles: updatedFiles,
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[30em] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Folder and Files</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Folder Name</label>
                        <input
                            type="text"
                            name="folderName"
                            value={formData.folderName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Folder Year</label>
                        <input
                            type="number"
                            name="folderYear"
                            value={formData.folderYear}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Course</label>
                        <input
                            type="text"
                            name="selectedCourse"
                            value={formData.selectedCourse}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Institution</label>
                        <CustomSelect
                            options={institutions}
                            placeholder="Select Institution"
                            isOpen={openSelect === 'institution'}
                            onToggle={() => setOpenSelect(openSelect === 'institution' ? null : 'institution')}
                            onSelect={handleSelectInstitution}
                            reset={resetSelect}
                            defaultValue={formData.selectedInstitution} // Set default value
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags.join(', ')}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mt-4 mb-2">Uploaded Files</h3>
                        {formData.uploadedFiles.map((file, index) => (
                            <div key={index} className="mb-4 p-2 border rounded-md">
                                <div>
                                    <label className="block text-sm font-medium">File Name</label>
                                    <input
                                        type="text"
                                        value={file.fileName}
                                        onChange={(e) => handleFileChange(index, 'fileName', e.target.value)}
                                        className="mt-1 p-2 w-full border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">File URL</label>
                                    <input
                                        type="text"
                                        value={file.fileUrl}
                                        onChange={(e) => handleFileChange(index, 'fileUrl', e.target.value)}
                                        className="mt-1 p-2 w-full border rounded"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="mt-2 text-red-500 hover:text-red-700"
                                >
                                    Remove File
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddFile}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add File
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
