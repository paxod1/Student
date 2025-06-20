import React from 'react';
import { connect } from 'react-redux';
import { LogoutData } from '../Redux/UserSlice';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error, info);
        // Logout the user on any error
        this.props.dispatch(LogoutData());

    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h2>Something went wrong. Logging out...</h2>;
        }
        window.location.reload();
        return this.props.children;
    }
}

export default connect()(ErrorBoundary);
