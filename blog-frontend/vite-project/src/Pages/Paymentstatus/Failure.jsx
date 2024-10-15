// FailurePage.jsx
import React from 'react';

const FailurePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Payment Failed</h1>
            <p style={styles.message}>Unfortunately, your payment has failed. Please try again.</p>
            <button onClick={() => window.location.href = '/retry-payment'} style={styles.button}>Retry Payment</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px',
        backgroundColor: '#f8d7da',
        borderRadius: '8px',
        color: '#721c24',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    message: {
        fontSize: '1.2rem',
        marginTop: '10px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default FailurePage;
