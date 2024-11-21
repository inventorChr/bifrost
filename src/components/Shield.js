import React from 'react';

const Shield = ({
                    children,
                    title,
                    variant = 'default',
                    className = '',
                    ...props
                }) => {
    const variants = {
        default: 'from-[#1a2333] to-[#2a3142] border-[#40E0D0]',
        gold: 'from-[#2a3142] to-[#1a2333] border-[#ffd700]',
        frost: 'from-[#1a2333] to-[#2d4263] border-[#A5D8FF]'
    };

    return (
        <div
            className={`
                relative 
                p-6 
                rounded-lg 
                overflow-hidden
                transition-all 
                duration-300 
                hover:shadow-lg
                ${className}
            `}
            {...props}
        >
            {/* Gradient background with Norse pattern overlay */}
            <div className={`
        absolute 
        inset-0 
        bg-gradient-to-br 
        ${variants[variant]} 
        opacity-95
      `} />

            {/* Animated border effect */}
            <div className={`
        absolute 
        inset-0 
        border-2 
        ${variants[variant].split(' ')[2]}
        rounded-lg
        transition-all
        duration-500
      `}>
                <div className="absolute -inset-1 opacity-20 blur-xl bg-[#40E0D0]" />
            </div>

            {/* Norse corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ffd700]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ffd700]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ffd700]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ffd700]" />

            {/* Main content container */}
            <div className="relative z-10">
                {title && (
                    <div className="flex items-center justify-center mb-4">
                        {/* Decorative line */}
                        <div className="h-[2px] flex-grow max-w-[50px] bg-gradient-to-r from-transparent to-[#ffd700]" />

                        {/* Title */}
                        <h3 className="
              text-[#ffd700]
              text-xl
              font-bold
              px-4
              text-center
              tracking-wider
            ">
                            {title}
                        </h3>

                        {/* Decorative line */}
                        <div className="h-[2px] flex-grow max-w-[50px] bg-gradient-to-l from-transparent to-[#ffd700]" />
                    </div>
                )}

                {/* Content */}
                <div className="text-[#e6f1ff]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Shield;