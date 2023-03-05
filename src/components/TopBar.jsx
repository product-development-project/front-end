import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "./UI/Button";

export default function TopBar(props) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundColor: "green",
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
                {!props.backButtonDisabled &&
                    <Button
                        value="Back"
                        name="back-button"
                        onClick={() => navigate(-1)}
                        style={{
                            marginTop: '10px'
                        }}
                    />
                }
            </div>
        </div>
    )
}