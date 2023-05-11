
import React from 'react'
import './style.css';

export default function Form(props) {
    return (
        <div className='form'>
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
            </form>
        </div>
    )
}