import React from 'react'

const Notification = ({message, style}) => {
  return (
    <p style={style}>{message}</p>
  )
}

export default Notification