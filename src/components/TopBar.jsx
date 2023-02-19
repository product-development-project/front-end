import React from 'react'

export default function TopBar(props) {
    return (
        <div
            style={{
                backgroundColor: "purple",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: '20px'
            }}
        >
            <div
                style={{
                    fontSize: '35px',
                    paddingLeft: '10px'
                }}
            >
                <b>{props.title}</b>
            </div>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {props.children}
            </div>
        </div>
    )
}