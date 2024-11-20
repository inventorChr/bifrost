import React from 'react';
import Shield from '../components/Shield';
import Rune from '../components/Rune';

const Home = () => (
    <div className="container mx-auto px-4 py-8">
        <Shield title="Welcome to Bifrost">
            <p className="mb-6">
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
                <p>View the latest market trends and analysis</p>
                <Rune variant="secondary" className="mt-4">
                    View Markets
                </Rune>
            </Shield>

            <Shield title="Portfolio Status" variant="gold">
                <p>Check your current holdings and performance</p>
                <Rune variant="secondary" className="mt-4">
                    View Portfolio
                </Rune>
            </Shield>
        </div>
    </div>
);

export default Home;