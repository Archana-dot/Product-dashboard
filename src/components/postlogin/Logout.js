import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

function Logout(props) {

    let history = useHistory();
    function removeUser() {
        window.localStorage.setItem('token', false);
        localStorage.removeItem('currentUsername');
        history.push('/');
        props.handleClose();
    }
    return (
        
             <Dialog open={props.open} onClose={props.handleClose}>
                 <DialogTitle>
                     Are you sure ? 
                 </DialogTitle>
                 <DialogContent>
                     <DialogContentText>
                         <Button color="secondary" variant="contained" onClick={removeUser} >Ok</Button>
                     </DialogContentText>
                 </DialogContent>
             <DialogActions>
                 <Button onClick={props.handleClose} color="secondary">Close</Button>
             </DialogActions>
             </Dialog>
        
    )
}
export default Logout;


// function Logout(props){
//     const history = useHistory();

//     const removeUser=(e)=> {
//         e.preventDefault();
//         localStorage.setItem('token', false);
//         localStorage.removeItem('currentUsername');
//         window.location.reload(false);
//         console.log("move to the home page ")
//         return <Redirect to='/' />;
//     }

    