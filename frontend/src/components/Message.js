import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [showMessage, setShowMessage] = useState(true)

  setTimeout(() => {
    setShowMessage(false)
  }, 5000)

  return showMessage && <Alert variant={variant}>{children}</Alert>
}
Message.defaultProps = {
  variant: 'info',
}
export default Message
