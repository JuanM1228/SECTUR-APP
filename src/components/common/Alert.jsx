import React from 'react'
import PropTypes from 'prop-types'

import AlertMUI from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = ({
  open = false,
  severity = 'success',
  variant = 'filled',
  children,
  autoHideDuration = 6000,
  onClose = () => {},
  vertical = 'bottom',
  horizontal = 'right',
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}>
      <AlertMUI onClose={onClose} severity={severity} variant={variant}>
        {children}
      </AlertMUI>
    </Snackbar>
  )
}

Alert.propTypes = {
  open: PropTypes.bool,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  children: PropTypes.node,
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func,
  vertical: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontal: PropTypes.oneOf(['left', 'center', 'right']),
}

export default Alert
