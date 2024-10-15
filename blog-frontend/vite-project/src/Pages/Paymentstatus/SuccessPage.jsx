// SuccessPage.jsx
import React from 'react';

const SuccessPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Payment Successful!</h1>
            <p style={styles.message}>Your blog has been added successfully.</p>
            <button onClick={() => window.location.href = '/'} style={styles.button}>Go to Home</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px',
        backgroundColor: '#d4edda',
        borderRadius: '8px',
        color: '#155724',
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
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default SuccessPage;
