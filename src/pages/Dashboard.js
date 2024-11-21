import React from 'react';
import Shield from '../components/Shield';
import Rune from '../components/Rune';

const Dashboard = () => (
    <div className="container mx-auto px-4 py-8">
        <Shield title="About Bifröst" variant="gold">
            <p className="mb-6">
                Bifröst blends the honor and strength of Viking traditions with
                cutting-edge cryptocurrency technology. Our platform serves as your bridge
                between the ancient wisdom of wealth management and modern digital assets.
            </p>
            <div className="flex justify-center">
                <Rune variant="primary">Join Our Community</Rune>
            </div>
        </Shield>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Shield title="Our Mission" variant="frost">
                <p>To provide a secure and powerful platform for cryptocurrency trading,
                    inspired by the strength and reliability of Norse traditions.</p>
            </Shield>

            <Shield title="Our Values" variant="default">
                <ul className="list-disc list-inside space-y-2">
                    <li>Strength in Security</li>
                    <li>Honor in Transparency</li>
                    <li>Wisdom in Technology</li>
                    <li>Community Leadership</li>
                </ul>
            </Shield>
        </div>
    </div>
);

export default Dashboard;