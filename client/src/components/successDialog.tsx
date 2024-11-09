
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuccessDialog = () => {
    return(
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-1"> 
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-600"/> 
                    Registration Successful!
                </AlertDialogTitle>
                <AlertDialogDescription>
                    You are going to get redirected to signin page to get started
                </AlertDialogDescription>
                </AlertDialogHeader>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SuccessDialog;