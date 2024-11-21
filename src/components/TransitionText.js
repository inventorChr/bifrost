import React, { useState, useEffect } from 'react';

const TransitionText = ({ runic, english, className = "", centered = false }) => {
    const [showRunic, setShowRunic] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRunic(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const positionClasses = centered ?
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full" :
        "absolute top-0 left-0 right-0";

    return (
        <div className={`relative ${className}`}>
            <span
                className={`${positionClasses} transition-all duration-1000 ${
                    showRunic ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
            >
                {runic}
            </span>
            <span
                className={`${positionClasses} transition-all duration-1000 ${
                    showRunic ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
                {english}
            </span>
            <span className="opacity-0">{english}</span>
        </div>
    );
};

export default TransitionText;