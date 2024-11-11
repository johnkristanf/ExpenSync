
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SuccessDialogProps {
    title: string,
    message: string,
}

const SuccessDialog = ({title, message}: SuccessDialogProps) => {
    return(
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-1"> 
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-600"/> 
                    { title }
                    
                </AlertDialogTitle>
                <AlertDialogDescription>
                    { message }
                    
                </AlertDialogDescription>
                </AlertDialogHeader>

                       
                
                
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SuccessDialog;