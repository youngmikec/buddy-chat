import react, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/withStyles';
import theme from '../utils/theme';
import dayjs from 'dayjs';

// MUI stuff
import { Paper, Button, Typography } from '@material-ui/core';
// import { MuiLink } from '@material/core/Link';
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkOff from '@material-ui/icons/LinkOff';




class Profile extends Component {
    state = {
        loading: false,
        profile: {}
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
                buttons: {
                    textAlign: 'center',
                    color: theme.palette.primary.main,
                    '& a': {
                        margin: '20px 10px'
                    }
                }
            }
        };
        const { classes, user: {userHandle, profileImage, createdAt, bio, location, website}, loading, authenticated } = this.props;
        let profileMarkup = !loading ? ( authenticated ? (
            <Paper className={ styles.paper }>
                <div className={styles.profile['image-wrapper']}>
                    <div style={styles.profile['profile-image']}>
                        <img style={{width: '100%', borderRadius: '50%'}} src={profileImage} alt="profile"/>
                    </div>
                    <hr style={{border: 'none', margin: '10px 0px'}} />

                    <div style={styles.profile["profile-details"]}>
                        <Button className={styles.profile.buttons} color="primary" component={Link} to={`users/${userHandle}`} color="primary" variant="h5">
                            @{userHandle}
                        </Button>
                        <hr style={{border: 'none', margin: '10px 0px'}} />

                        {/* {bio && <Typography variant="body2"> { bio } </Typography>}
                        <hr style={{border: 'none', margin: '10px 0px'}} />

                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> 
                                <span>{ location }</span>
                                <hr style={{border: 'none', margin: '10px 0px'}} />
                            </Fragment>
                        )}

                        {website && (
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
    classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(Profile);
export default Profile;

