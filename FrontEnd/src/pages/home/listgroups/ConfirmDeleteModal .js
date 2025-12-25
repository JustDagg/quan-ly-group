export const ConfirmDeleteModal = ({ show, onClose, onConfirm, groupName }) => {
    if (!show) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '8px',
                    width: '420px',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
                    Confirm Delete Group
                </h2>
                <p style={{ fontSize: '16px', color: '#555' }}>
                    Are you sure you want to delete the group with name <strong>"{groupName}"</strong>?
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '30px',
                    }}
                >
                    <button
                        style={{
                            backgroundColor: '#f0f0f0',
                            padding: '10px 30px',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            backgroundColor: '#e74c3c',
                            color: '#fff',
                            padding: '10px 30px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={onConfirm}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
