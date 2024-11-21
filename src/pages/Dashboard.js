import React, { useState } from 'react';
import Shield from '../components/Shield';
import Rune from '../components/Rune';

const Dashboard = () => {
    const [walletConnected, setWalletConnected] = useState(false);

    const mockStats = {
        staked: "1,234.56 HAMR",
        rewards: "45.67 FATE",
        rank: "Warrior",
        questsCompleted: 7
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Wallet Connection */}
            <Shield
                title="CONNECT TO RÚNSKRIN"
                variant="gold"
                className={`mb-8 ${walletConnected ? 'border-asgard-gold' : 'border-bifrost-teal'}`}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-center mb-4">
                        {walletConnected
                            ? "Your wallet is connected to the realms of Valhalla"
                            : "Connect your wallet to begin your ascension"}
                    </p>
                    <Rune
                        variant={walletConnected ? "secondary" : "primary"}
                        onClick={() => setWalletConnected(!walletConnected)}
                    >
                        {walletConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
                    </Rune>
                </div>
            </Shield>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Object.entries(mockStats).map(([key, value]) => (
                    <Shield
                        key={key}
                        title={key.toUpperCase()}
                        variant="frost"
                        className="text-center"
                    >
                        <p className="text-2xl font-bold text-asgard-gold">{value}</p>
                    </Shield>
                ))}
            </div>

            {/* Active Quests */}
            <Shield title="ACTIVE QUESTS" variant="default" className="mb-8">
                <div className="space-y-4">
                    {[
                        { title: "Daily Stake", reward: "10 FATE", progress: 70 },
                        { title: "Trading Volume", reward: "25 FATE", progress: 30 },
                        { title: "Community Quest", reward: "50 FATE", progress: 45 }
                    ].map((quest, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-deep-nordic-blue rounded-lg">
                            <div>
                                <h4 className="text-asgard-gold font-bold">{quest.title}</h4>
                                <p className="text-sm text-frost-white">Reward: {quest.reward}</p>
                            </div>
                            <div className="w-32">
                                <div className="h-2 bg-rune-stone rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-bifrost-teal"
                                        style={{ width: `${quest.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-center mt-1">{quest.progress}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Shield>
        </div>
    );
};

export default Dashboard;