import react, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/withStyles';
import theme from '../utils/theme';
import dayjs from 'dayjs';

// MUI stuff
import { Paper, Button, Typography, IconButton,  } from '@material-ui/core';
import { EditIcon } from '@material-ui/icons/Edit';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';
// import { MuiLink } from '@material/core/Link';
import { LocationOn, CalendarToday } from '@material-ui/icons';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import LinkOff from '@material-ui/icons/LinkOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import axios from 'axios';

// components
import EditProfile from './EditProfile';




class Profile extends Component {
    state = {
        loading: false,
        profile: {}
    }

    handleImageUpload = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('profile-image', image, image.name);
        axios.post('https://api.pmt.ng/api/multimedia/media/binary', formData)
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err));
    }

    handleEditImage = () => {
        const fileInput = document.querySelector('#image-upload');
        fileInput.click();
    }

    handleLogout = () => {
        localStorage.clear();
        // window.history = '/login';
        window.location.href = '/login';
        console.log('user logged out');
    }
  
    render(){
        const styles = {
            paper: {
                padding: 20
            },
            hr: {
                border: 'none',
                // margin: '0 0 10px 0'
                margin: '10px 0'
            },
            profile: {
                'image-wrapper': {
                    textAlign: 'center',
                    position: 'relative',
                    '& button': {
                        position: 'absolute',
                        top: '80%',
                        left: '70%'
                    }
                },
                'profile-image': {
                    padding: 20,
                    margin: '10px auto',
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    maxWidth: '100%',
                    borderRadius: '50%'
                },
                'profile-details': {
                    textAlign: 'center',
                    paddingBottom: '2em',
                    '& span, svg': {
                        verticalAlign: 'middle',
                    },
                    '& a': {
                        color: theme.palette.primary.main
                    }
                },
                '& hr': {
                    border: 'none',
                    // margin: '0 0 10px 0'
                    margin: '10px 0'
                },
                '& svg.button': {
                    '&:hover': {
                        cursor: 'pointer'
                    }
                },
                imageButton: {
                    position: 'absolute',
                    top: '22%',
                    right: '11%'
                },
                buttons: {
                    textAlign: 'center',
                    color: theme.palette.primary.main,
                    '& a': {
                        margin: '20px 10px'
                    }
                }
            }
        };
        const { classes, user: {userHandle, profileImage, email, createdAt, bio, location, website}, loading, authenticated } = this.props;
        let profileMarkup = !loading ? ( authenticated ? (
            <Paper style={ styles.paper }>
                <div className={styles.profile['image-wrapper'], {position: 'relative'}}>
                    <div style={styles.profile['profile-image']}>
                        <img style={{width: '100%', borderRadius: '50%'}} src={profileImage} alt="profile"/>
                        <input type="file" id="image-upload" onChange={this.handleImageUpload} hidden="hidden" />

                        <Tooltip title="Upload profile image" placement='top'>
                            <IconButton onClick={this.handleEditImage} style={styles.profile.imageButton} >
                                {/* <EditIcon color="primary" /> */}
                                <EditOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr style={{border: 'none', margin: '10px 0px'}} />

                    <div style={styles.profile["profile-details"]}>
                        <Button style={styles.profile.buttons} color="primary" component={Link} to={`users/${userHandle}`} color="primary" variant="text">
                            @{userHandle}
                        </Button>
                        <hr style={{border: 'none', margin: '10px 0px'}} />

                        {/* {bio && <Typography variant="body2"> { bio } </Typography>}
                        <hr style={{border: 'none', margin: '10px 0px'}} /> */}

                        {location && (
                            <Fragment>
                                <LocationOnIcon color="primary" /> 
                                <span>{ email }</span>
                                <hr style={{border: 'none', margin: '10px 0px'}} />
                            </Fragment>
                        )}

                        {/* {website && (
                            <Fragment>
                                <LinkOff color="primary" />
                                <a href={ website } target="_blank" rel="noopener noreferrer">
                                    {' '} { website }
                                </a>
                                <hr style={{border: 'none', margin: '10px 0px'}} />
                            </Fragment>
                        )} */}

                        <CalendarToday color="primary" /> {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

                        <Tooltip title="Logout" placement="top">
                            <IconButton color="primary" onClick={this.handleLogout}>
                                <KeyboardReturnIcon color="primary" />
                            </IconButton> 
                        </Tooltip>

                        <EditProfile style={{ textAlign: 'center', margin: '10px auto', width: '50%' }} props={this.props} />
                    </div>

                </div>
            </Paper>
        ) : (
            <Paper className={styles.paper}>
                <Typography variant="body2">
                    No profile found, please login again.
                </Typography>

                <div className={styles.buttons}>
                    <Button variant="contained" color="primary" component={Link} to='/login'>Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to='/signup'>Signup</Button>
                </div>
            </Paper>
        )) : (<p>Loading ...</p>);
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object
};

// export default withStyles(styles)(Profile);
export default Profile;

