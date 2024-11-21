import React from 'react';
import { Link } from 'react-router-dom';
import TransitionText from '../components/TransitionText';

const NavLink = ({ to, runic, english }) => (
    <Link
        to={to}
        className="group relative flex items-center justify-center w-32 h-12 text-center px-4 py-2"
    >
        <TransitionText
            runic={runic}
            english={english}
            className="text-frost-white group-hover:text-asgard-gold tracking-widest transition-colors duration-300"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-asgard-gold group-hover:w-full transition-all duration-300" />
    </Link>
);

const FloatingRune = ({ children, className, delay = "0s" }) => (
    <div
        className={`absolute text-3xl text-asgard-gold opacity-100 ${className}`}
        style={{ animationDelay: delay }}
    >
        {children}
    </div>
);

const Header = () => (
    <header className="relative py-8 px-4 overflow-hidden min-h-[200px]">
        <div className="absolute inset-0 pointer-events-none">
            <FloatingRune className="top-[10%] left-[15%] animate-float-1">ᚱ</FloatingRune>
            <FloatingRune className="top-[5%] right-[25%] animate-float-2" delay="2s">ᚢ</FloatingRune>
            <FloatingRune className="top-[8%] left-[40%] animate-float-3" delay="1s">ᚾ</FloatingRune>
            <FloatingRune className="top-[30%] left-[20%] text-4xl animate-float-1" delay="1.5s">⛨</FloatingRune>
            <FloatingRune className="top-[35%] right-[15%] animate-float-2" delay="3s">ᛋ</FloatingRune>
            <FloatingRune className="top-[40%] left-[35%] animate-float-3" delay="2.5s">ᚲ</FloatingRune>
            <FloatingRune className="bottom-[15%] left-[25%] animate-float-1" delay="0.5s">ᚱ</FloatingRune>
            <FloatingRune className="bottom-[20%] right-[30%] animate-float-2" delay="1.8s">ᛁ</FloatingRune>
            <FloatingRune className="bottom-[25%] left-[45%] animate-float-3" delay="3.5s">ᚾ</FloatingRune>
        </div>

        <div className="relative z-10">
            <div className="relative text-center mb-8">
                <h1 className="inline-block font-bold mb-0">
                    <div
                        className="relative text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] h-[1.5em] text-center font-bold text-asgard-gold"
                        style={{
                            textShadow: "0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #B8860B, 0 0 40px #B8860B",
                        }}
                    >
                        <TransitionText
                            runic="ᚱᚢᚾᛋᚲᚱᛁᚾ"
                            english="RÚNSKRIN"
                            className="text-center font-bold"
                        />
                    </div>
                </h1>

                <div className="absolute left-1/2 -translate-x-1/2 w-64 h-0.5 mt-2">
                    <div className="h-full bg-gradient-to-r from-transparent via-asgard-gold to-transparent animate-pulse" />
                </div>
            </div>

            <nav className="relative mt-12 py-4 flex justify-center items-center gap-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent to-asgard-gold animate-pulse" />

                <div className="flex items-center justify-center">
                    <NavLink to="/" runic="ᚻᚨᛚᛚ" english="HOME" />
                    <span className="text-asgard-gold animate-pulse">•</span>
                    <NavLink to="/dashboard" runic="ᚹᚨᚢᛚᛏ" english="VAULT" />
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-transparent to-asgard-gold animate-pulse" />
            </nav>
        </div>
    </header>
);

export default Header;