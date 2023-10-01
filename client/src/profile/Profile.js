import React from 'react'

function ProfileDetail({ profiles }) {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: 'solid 1px #dddddd',
                    paddingBottom: '20px',
                }}
            >
                <img
                    alt={profiles?.businessName}
                    src={profiles.logo}
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: '0',
                    maxWidth: '450px',
                }}
            >
                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <i
                        className="fas fa-building"
                        style={{
                            marginRight: '20px',
                            color: 'gray',
                            fontSize: '24px',
                        }}
                    />
                    <span>{profiles?.businessName}</span>
                </li>

                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <i
                        className="fas fa-map-marker-alt"
                        style={{
                            marginRight: '20px',
                            color: 'gray',
                            fontSize: '24px',
                        }}
                    />
                    <span>{profiles?.contactAddress}</span>
                </li>

                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <i
                        className="fas fa-phone"
                        style={{
                            marginRight: '20px',
                            color: 'gray',
                            fontSize: '24px',
                        }}
                    />
                    <span>{profiles?.phoneNumber}</span>
                </li>

                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <i
                        className="fas fa-envelope"
                        style={{
                            marginRight: '20px',
                            color: 'gray',
                            fontSize: '24px',
                        }}
                    />
                    <span>{profiles?.email}</span>
                </li>

                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <i
                        className="fas fa-wallet"
                        style={{
                            marginRight: '20px',
                            color: 'gray',
                            fontSize: '24px',
                        }}
                    />
                    <span>{profiles?.paymentDetails}</span>
                </li>
            </ul>
        </>
    );
};


export default ProfileDetail
