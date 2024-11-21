import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Shield from '../components/Shield';

const TransitionText = ({ runic, english, className = "" }) => {
    const [showRunic, setShowRunic] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRunic(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <span
                className={`absolute top-0 left-0 right-0 transition-all duration-1000 ${
                    showRunic ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
            >
                {runic}
            </span>
            <span
                className={`absolute top-0 left-0 right-0 transition-all duration-1000 ${
                    showRunic ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
                {english}
            </span>
            <span className="opacity-0">{english}</span>
        </div>
    );
};

const RunicButton = ({ runic, english, onClick, variant = "primary" }) => {
    const baseStyles = "relative overflow-hidden font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 min-w-[200px] text-center";

    const variants = {
        primary: "bg-gradient-to-r from-[#1a2333] to-[#2a3142] text-[#e6f1ff] border-2 border-[#ffd700]",
        secondary: "bg-gradient-to-r from-[#2a3142] to-[#1a2333] text-[#40E0D0] border-2 border-[#40E0D0]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} group`}
            onClick={onClick}
        >
            <TransitionText
                runic={runic}
                english={english}
                className="inline-block"
            />
            <div className="absolute inset-0 bg-[#ffd700] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 bg-[#ffd700]" />
        </button>
    );
};

const ShieldTitle = ({ runic, english }) => (
    <div className="flex items-center justify-center h-8">
        <TransitionText
            runic={runic}
            english={english}
            className="text-2xl"
        />
    </div>
);

const Home = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleBeginPathClick = () => {
        navigate('/dashboard'); // Navigate to the Dashboard route
    };

    return (
        <div className="min-h-screen bg-deep-nordic-blue">
            <div className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-mystic-purple via-bifrost-teal to-transparent animate-float-1" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ice-blue via-asgard-gold to-transparent animate-float-2" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-8 space-y-6">
                        <div className="relative h-8">
                            <TransitionText
                                runic="ᛖᚨᚱᚾ ᛃᛟᚢᚱ ᛈᛚᚨᚲᛖ ᚨᛗᛟᛜ ᚦᛖ ᚲᚱᛃᛈᛏᛟ ᚷᛟᛞᛋ"
                                english="EARN YOUR PLACE AMONG THE CRYPTO GODS"
                                className="text-xl md:text-2xl text-frost-white tracking-[0.25em] font-runic"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-12">
                        <RunicButton
                            runic="ᛒᛖᚷᛁᚾ ᛃᛟᚢᚱ ᛈᚨᚦ"
                            english="BEGIN YOUR PATH"
                            variant="primary"
                            onClick={handleBeginPathClick} // Navigate on click
                        />
                        <RunicButton
                            runic="ᛚᛖᚨᚱᚾ ᚦᛖ ᛋᚨᚷᚨᛋ"
                            english="LEARN THE SAGAS"
                            variant="secondary"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
                <Shield
                    title={<ShieldTitle runic="ᛋᛏᚨᚲᛁᛜ" english="STAKING" />}
                    variant="gold"
                    className="transform hover:scale-105 transition-transform"
                >
                    <div className="text-center space-y-4">
                        <span className="text-4xl">⚔️</span>
                        <p className="tracking-wider">Stake your tokens in our divine pools and earn rewards worthy of Odin's favor</p>
                    </div>
                </Shield>

                <Shield
                    title={<ShieldTitle runic="ᚲᚹᛖᛋᛏᛋ" english="QUESTS" />}
                    variant="frost"
                    className="transform hover:scale-105 transition-transform"
                >
                    <div className="text-center space-y-4">
                        <span className="text-4xl">🛡️</span>
                        <p className="tracking-wider">Complete daily challenges to earn exclusive rewards and rise through the ranks</p>
                    </div>
                </Shield>

                <Shield
                    title={<ShieldTitle runic="ᚻᚨᛚᛚᛋ" english="HALLS" />}
                    variant="default"
                    className="transform hover:scale-105 transition-transform"
                >
                    <div className="text-center space-y-4">
                        <span className="text-4xl">👑</span>
                        <p className="tracking-wider">Compete with fellow warriors for a place in our eternal leaderboards</p>
                    </div>
                </Shield>
            </div>
        </div>
    );
};

export default Home;
