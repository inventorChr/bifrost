import React from 'react';
import Shield from '../components/Shield';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Store the error in state along with the flag
        return {
            hasError: true,
            error: error
        };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error('Error caught by boundary:', error, errorInfo);

        this.setState({
            errorInfo: errorInfo
        });

        // Handle 404 resource errors specifically
        if (error instanceof TypeError && error.message.includes('404')) {
            console.warn('Resource not found:', error.message);
        }
    }

    render() {
        if (this.state.hasError) {
            const isResourceError = this.state.error instanceof TypeError &&
                this.state.error.message.includes('404');

            return (
                <Shield variant="frost" className="m-4">
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-frost-white mb-4">
                            {isResourceError
                                ? "Resource Not Found"
                                : "Oops! Something went wrong."}
                        </h2>
                        <p className="text-frost-white/80 mb-4">
                            {isResourceError
                                ? "A required resource could not be loaded. This might be temporary."
                                : "We've encountered an unexpected error."}
                        </p>
                        <div className="space-y-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-asgard-gold text-deep-nordic-blue rounded hover:bg-asgard-gold/90 transition-colors"
                            >
                                Refresh Page
                            </button>
                            {process.env.NODE_ENV === 'development' && (
                                <details className="mt-4 text-left">
                                    <summary className="text-frost-white/60 cursor-pointer">
                                        Error Details
                                    </summary>
                                    <pre className="mt-2 p-4 bg-deep-nordic-blue/50 rounded text-frost-white/60 text-sm overflow-auto">
                                        {this.state.error?.toString()}
                                        {"\n\n"}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </Shield>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;