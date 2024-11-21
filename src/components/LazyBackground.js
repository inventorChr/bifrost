import React, { useEffect, useState } from 'react';

const LazyBackground = ({ children, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Create new image object to preload
        const img = new Image();
        img.src = require('../assets/optimized/viking-background.webp');

        img.onload = () => {
            setIsLoaded(true);
        };
    }, []);

    return (
        <div className={`lazy-background ${isLoaded ? 'loaded' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default LazyBackground;