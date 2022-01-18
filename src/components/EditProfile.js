import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../utils/theme';


EditProfile.propTypes = {
    editUserDetails: PropTypes.object,
    classes: PropTypes.object
};



export default function EditProfile(props) {
    const styles = {
        form: {
            textAlign: 'center'
        },
        image:{
            margin: '20px auto',
            width: '60px',
            borderRadius: '100%'
        },
        pageTitle:{
            margin: '10px auto'
        },
        textField: {
            margin: '15px auto'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        button:{
            position: 'relative'
        },
        progress: {
            position: 'absolute'
        }
    }
    console.log('props', props);
    const { props: { user }} = props;
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({userHandle: '', profileImage: '', email: '', createdAt: '', bio: '', location: '', website: ''});
    
    const themeStyles = (theme) => ({ ...theme});
    
    const handleClickOpen = () => {
        setOpen(true);
        mapUserDetailsToState(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({target}) => {
    setState({
        [target.name]: target.value
    })
  }

  const handleSubmit = () => {
      const userDetails = {
          bio: state.bio,
          userHandle: state.userHandle,
          email: state.email,
      }
    //   props.editUserDetails();
      handleClose();
  }
  

  const [profile, setProfile] = React.useState(
    {userHandle: '', profileImage: '', email: '', createdAt: '', bio: '', location: '', website: ''}
  )

  const [loading, setLoading] = React.useState(false);

  const mapUserDetailsToState = (details) => {
      setState({
          userHandle: details.userHandle ? details.userHandle : '',
          profileImage: details.profileImage ? details.profileImage : '',
          email: details.email ? details.email : '',
          createdAt: details.createdAt ? details.createdAt : '',
          bio: details.bio ? details.bio : '',
          location: details.location ? details.location : '',
          website: details.website ? details.website : ''
      })
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit your Profile Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <form>
                <TextField 
                component={'span'}
                name='bio'
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short biography about yourself"
                value={state.bio}
                style={styles.textField}
                onChange={handleChange}
                fullWidth
                 />
                <TextField 
                component={'span'}
                name='userHandle'
                type="text"
                label="User Handle"
                placeholder="your userhandle"
                value={state.userHandle}
                style={styles.textField}
                onChange={handleChange}
                fullWidth
                 />
                <TextField 
                component={'span'}
                name='email'
                type="email"
                label="Email"
                placeholder="example@gmail.com"
                value={state.email}
                style={styles.textField}
                onChange={handleChange}
                fullWidth
                 />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}