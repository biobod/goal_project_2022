import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useEffect } from 'react'

interface SnackbarProps {
    message: string
    type: 'error' | 'warning' | 'info' | 'success'
    isOpen: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const CustomizedSnackbar = ({ message, type, isOpen }: SnackbarProps) => {
    const [open, setOpen] = React.useState(isOpen)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen, message, type])
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={open}
                // autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert
                    severity={type}
                    onClose={handleClose}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default CustomizedSnackbar
