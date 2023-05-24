import React from 'react'
import { Button } from "../Button";
import './style.css';

export default function Popup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
        {props.buttons?.length > 0 &&
          <div style={{ 'marginTop': '10px', 'display': 'flex', 'justifyContent': 'center' }}>
            {props.buttons?.map((item, key) => {
              const buttonName = `button-${key}`
              return (
                <Button
                  value={item.name}
                  name={buttonName}
                  onClick={item.onClick}
                />
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}