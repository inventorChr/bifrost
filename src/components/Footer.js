import React from 'react';
import LazyBackground from "./LazyBackground";

const Footer = () => (
    <LazyBackground>
        <footer style={{
            padding: '1rem',
            marginTop: '2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--bifrost-teal)'
        }}>
            <p style={{color: 'var(--frost-white)'}}>
                © 2024 RÚNSKRIN • Bridge Between Realms
            </p>
        </footer>
    </LazyBackground>
);

export default Footer;