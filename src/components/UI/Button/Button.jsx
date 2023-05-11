import React from 'react'
import './style.css';

export default function Button(props) {
    if (props.type === 'select') {
        const { defaultOptionValue, defaultOptionName, options, ...rest } = props;
        delete rest.type;
        return (
            <div>
                <select
                    {...rest}
                    className={props.disabled ? 'button-disabled' : 'button'}
                >
                    <option value={defaultOptionValue}>{defaultOptionName || 'All Data'}</option>
                    {options.map((item, key) => {
                        return (
                            <option key={key} value={item.value}>{item.name}</option>
                        )
                    })
                    }
                </select>
            </div>
        )
    }
    return (
        <div>
            <input
                {...props}
                type='button'
                className={props.disabled ? 'button-disabled' : 'button'}
            />
        </div>
    )
}