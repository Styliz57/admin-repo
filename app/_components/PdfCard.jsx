import React, { useState } from 'react';
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import EditModal from './EditModal';

const PdfCard = ({ id, title, year, course, institution, tags, uploadedFiles, onDelete, onEdit }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            onDelete(id);
        }
    };

    const handleSave = (updatedData) => {
        onEdit(id, updatedData);
    };

    return (
        <div className="p-4 border rounded-lg shadow-md w-[23em] relative">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p>{year}</p>
            <p>{course}</p>
            <p>{institution?.name || institution}</p> {/* Render institution correctly */}
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                        {typeof tag === 'object' ? tag.name : tag} {/* Ensure tag is a string */}
                    </span>
                ))}
            </div>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
                <IoMdTrash size={20} />
            </button>
            <button
                onClick={handleEdit}
                className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
            >
                <MdEdit size={20} />
            </button>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                initialData={{
                    folderName: title,
                    folderYear: year,
                    selectedCourse: course,
                    selectedInstitution: institution?.name || institution, // Ensure correct institution
                    tags: tags,
                    uploadedFiles: uploadedFiles,
                }}
            />
        </div>
    );
};

export default PdfCard;
