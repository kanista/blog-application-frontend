import React, {useEffect} from 'react';
import './Alert.scss';

const Alert = ({ message, type, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            <span className="alert-message">{message}</span>
            <span className="alert-close" onClick={onClose}>&times;</span>
        </div>
    );
};

export default Alert;
