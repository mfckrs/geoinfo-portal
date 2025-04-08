import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

// Create a wrapper for translation since ErrorBoundary is a class component
const ErrorFallback: React.FC<{ error: Error | null; errorInfo: ErrorInfo | null }> = ({ error, errorInfo }) => {
    const { t } = useTranslation();

    return (
        <div className="error-boundary">
            <div className="error-container">
                <h2>{t('error_occurred')}</h2>
                <p>{t('error_message')}</p>
                <div className="error-details">
                    <h3>{t('error_details')}:</h3>
                    <p>{error?.toString()}</p>
                    <details>
                        <summary>{t('component_stack')}</summary>
                        <pre>{errorInfo?.componentStack}</pre>
                    </details>
                </div>
                <button
                    className="error-retry-button"
                    onClick={() => window.location.reload()}
                >
                    {t('retry')}
                </button>
            </div>
        </div>
    );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can also log the error to an error reporting service
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render(): ReactNode {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            if (fallback) {
                return fallback;
            }

            return <ErrorFallback error={error} errorInfo={errorInfo} />;
        }

        return children;
    }
}

export default ErrorBoundary;