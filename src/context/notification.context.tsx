import React from 'react';
import { Notification } from '../components';
import { AlertColor } from '@mui/material';

type ContextProps = {
  getError: (msgAlert: string) => void;
  getSuccess: (msgAlert: string) => void;
}


const NotificationContext = React.createContext<ContextProps | null>(null)


export const NotificationProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const [msg, setMsg] = React.useState<string>("")
  const [open, setOpen] = React.useState<boolean>(false)
  const [severity, setSeverity] = React.useState<AlertColor | undefined>(undefined)

  const handleClose = () => {
    setOpen(false)
  }

  const getSuccess = (msgAlert: string) => {
    setSeverity("success")
    setOpen(true)
    setMsg(msgAlert)
  }

  const getError = (msgAlert: string) => {
    setSeverity("error")
    setOpen(true)
    setMsg(msgAlert)
  }

  const value = {
    getError,
    getSuccess
  }

  return (
    <NotificationContext.Provider value={value}>
      <Notification
        handleClose={handleClose}
        open={open}
        msg={msg}
        severity={severity}
      />
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if(!context) throw new Error("No existe contexto")

  return context
}