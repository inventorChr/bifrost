// Action buttons
import React from 'react';

const Rune = ({ children, onClick, variant = 'primary' }) => {
    const baseStyles = "relative overflow-hidden font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105";

    const variants = {
        primary: "bg-gradient-to-r from-[#1a2333] to-[#2a3142] text-[#e6f1ff] border-2 border-[#ffd700]",
        secondary: "bg-gradient-to-r from-[#2a3142] to-[#1a2333] text-[#40E0D0] border-2 border-[#40E0D0]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} group`}
            onClick={onClick}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-[#ffd700] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 bg-[#ffd700]" />
        </button>
    );
};

export default Rune;