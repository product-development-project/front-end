import React from 'react'
import './style.css';

export default function Form(props) {
    return (
        <div className='form' style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '90vh' }}>
            <form style={{
                width: '60%'
            }}
                onSubmit={props.onSubmit}
            >
                <h1 className='formTitle'>{props.title}</h1>
                {props.errorMessage !== '' &&
                    <p className='errorMessage'>{props.errorMessage}</p>
                }
                {props.children}
                <input
                    className='submitButton'
                    type='submit'
                    name='submit'
                    value={props.submitButtonTitle || 'Submit'}
                />
                <button
                    className='backButton'
                    onClick={props.onBack}
                >
                    {props.backButtonTitle || 'Back'}
                </button>
            </form>
        </div>
    )
}