import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="relative py-8 px-4 overflow-hidden min-h-[200px]">
        {/* Floating Runes Container */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Top row runes */}
            <div className="absolute text-3xl text-asgard-gold top-[10%] left-[15%] opacity-100 animate-float-1">ᚨ</div>
            <div className="absolute text-3xl text-asgard-gold top-[5%] right-[25%] opacity-100 animate-float-2"
                 style={{ animationDelay: '2s' }}>ᚱ</div>
            <div className="absolute text-3xl text-asgard-gold top-[8%] left-[40%] opacity-100 animate-float-3"
                 style={{ animationDelay: '1s' }}>ᚦ</div>

            {/* Middle row runes */}
            <div className="absolute text-4xl text-asgard-gold top-[30%] left-[20%] opacity-100 animate-float-1"
                 style={{ animationDelay: '1.5s' }}>⚔️</div>
            <div className="absolute text-3xl text-asgard-gold top-[35%] right-[15%] opacity-100 animate-float-2"
                 style={{ animationDelay: '3s' }}>ᛟ</div>
            <div className="absolute text-3xl text-asgard-gold top-[40%] left-[35%] opacity-100 animate-float-3"
                 style={{ animationDelay: '2.5s' }}>ᚺ</div>

            {/* Bottom row runes */}
            <div className="absolute text-3xl text-asgard-gold bottom-[15%] left-[25%] opacity-100 animate-float-1"
                 style={{ animationDelay: '0.5s' }}>ᚾ</div>
            <div className="absolute text-3xl text-asgard-gold bottom-[20%] right-[30%] opacity-100 animate-float-2"
                 style={{ animationDelay: '1.8s' }}>ᛈ</div>
            <div className="absolute text-4xl text-asgard-gold bottom-[25%] left-[45%] opacity-100 animate-float-3"
                 style={{ animationDelay: '3.5s' }}>⚡</div>
        </div>

        {/* Rest of the header content */}
        <div className="relative z-10">
            {/* Title Container */}
            <div className="relative">
                <h1 className="font-bold text-center mb-0">
            <span className="relative inline-block text-4xl md:text-5xl lg:text-6xl tracking-[0.2em]
                        text-transparent bg-clip-text bg-gradient-to-b from-asgard-gold via-asgard-gold to-bifrost-teal
                        animate-glow">
                BIFRÖST
                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-b from-asgard-gold to-bifrost-teal blur-sm animate-glow-layer-1"></span>
                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-b from-asgard-gold to-bifrost-teal blur-md animate-glow-layer-2"></span>
            </span>
                </h1>

                <div className="absolute left-1/2 -translate-x-1/2 w-64 h-0.5 animate-rune-glow mt-2">
                    <div className="h-full bg-gradient-to-r from-transparent via-asgard-gold to-transparent" />
                </div>
            </div>


            {/* Navigation */}
            <nav className="relative mt-8 py-4 flex justify-center items-center gap-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent to-asgard-gold animate-rune-glow" />

                <Link to="/" className="text-frost-white hover:text-asgard-gold transition-all duration-300 tracking-widest relative group">
                    <span className="relative z-10 group-hover:animate-glow-text">HOME</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-asgard-gold group-hover:w-full transition-all duration-300" />
                </Link>

                <span className="text-asgard-gold animate-rune-glow">•</span>

                <Link to="/about" className="text-frost-white hover:text-asgard-gold transition-all duration-300 tracking-widest relative group">
                    <span className="relative z-10 group-hover:animate-glow-text">ABOUT</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-asgard-gold group-hover:w-full transition-all duration-300" />
                </Link>

                <span className="text-asgard-gold animate-rune-glow">•</span>

                <Link to="/dashboard" className="text-frost-white hover:text-asgard-gold transition-all duration-300 tracking-widest relative group">
                    <span className="relative z-10 group-hover:animate-glow-text">DASHBOARD</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-asgard-gold group-hover:w-full transition-all duration-300" />
                </Link>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-transparent to-asgard-gold animate-rune-glow" />
            </nav>
        </div>
    </header>
);

export default Header;