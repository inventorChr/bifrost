import '@testing-library/jest-dom';

// Add any global test setup here
global.matchMedia = global.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};