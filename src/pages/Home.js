import React from 'react';
import Shield from '../components/Shield';
import Rune from '../components/Rune';

const Home = () => (
    <div className="container mx-auto px-4 py-8">
        <Shield title="Welcome to Bifröst">
            <p className="mb-6 text-center">
                Explore the ancient ways of managing your modern cryptocurrency portfolio!
            </p>
            <div className="flex gap-4 justify-center">
                <Rune variant="primary" onClick={() => console.log('Get Started')}>
                    Get Started
                </Rune>
                <Rune variant="secondary" onClick={() => console.log('Learn More')}>
                    Learn More
                </Rune>
            </div>
        </Shield>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Shield title="Market Overview" variant="frost">
                <p className="text-center">View the latest market trends and analysis</p>
                <div className="flex justify-center">
                    <Rune variant="secondary" className="mt-4">
                        View Markets
                    </Rune>
                </div>
            </Shield>

            <Shield title="Portfolio Status" variant="gold">
                <p className="text-center">Check your current holdings and performance</p>
                <div className="flex justify-center">
                    <Rune variant="secondary" className="mt-4">
                        View Portfolio
                    </Rune>
                </div>
            </Shield>
        </div>
    </div>
);

export default Home;