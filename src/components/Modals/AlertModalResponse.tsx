



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  




import React from 'react'

function AlertModalResponse({refModal = null, title ="",message ="",handleClick=()=>{} }) {
  return (
    <AlertDialog>
    <AlertDialogTrigger ref={refModal}>
     
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
         {title}
        </AlertDialogTitle>
        <AlertDialogDescription>
         {message}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        
        <AlertDialogAction
          onClick={handleClick}
        >
          {"D'accord"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default AlertModalResponse