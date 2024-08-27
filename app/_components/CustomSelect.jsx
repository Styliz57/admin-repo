'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const CustomSelect = ({ options, placeholder, isOpen, onToggle, onSelect, reset }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    onToggle(); // Close dropdown after selection
  };

  useEffect(() => {
    if (reset) {
      setSelectedOption(null); // Clear selected option on reset
    }
  }, [reset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(); // Close dropdown if clicking outside
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className="border p-2 rounded-md flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-10 
              ${options.length > 7 ? 'max-h-60 overflow-y-auto' : ''}`}
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
