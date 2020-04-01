import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(externalProps) {


    let openVar = externalProps.open ? true :false
    const [open,setOpen] =React.useState(openVar);



 
console.log("external props:"+Object.keys(externalProps))


  const handleClickOpen = () => {
    
  };

  const handleClose = () => {
    setOpen(false);



  };
const handleSubmit= ()=>{




    setOpen(false);



}



  return (


  
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} fullScreen="true" onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        
          <TextField
            
            margin="dense"
            id="nbCase"
            label="Case Number"

            type="number"
            fullWidth
          />
          <TextField
            
            margin="dense"
            id="nbDeath"
            label="Death Numbers"
            type="number"
            fullWidth
          />
 
    <TextField
            
            margin="dense"
            id="nbrecovered"
            label="Recovered Number"

            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Submit Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  
  );
}
