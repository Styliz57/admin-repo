import React from 'react';
import { IoMdTrash } from "react-icons/io";

const PdfCard = ({ id, title, year, course, institution, tags, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            onDelete(id);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md relative">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p>{year}</p>
            <p>{course}</p>
            <p>{institution}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
                <IoMdTrash size={20} />
            </button>
        </div>
    );
};

export default PdfCard;
