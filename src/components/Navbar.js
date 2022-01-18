import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// MUI  stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { IconButton,  } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';

class Navbar extends Component { 
    isAuthenticated = false;
    checkUserCredentials(){
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        return ( user && token ) ? {isAuthenticated: true, user} : {isAuthenticated: false, user};
    }

    componentDidMount(){
        const { isAuthenticated } = this.checkUserCredentials();
        this.isAuthenticated = isAuthenticated;
        console.log('isAuthenticated', this.isAuthenticated);
    }

    render() {
        const {isAuthenticated, user} = this.checkUserCredentials();

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    { isAuthenticated ? (
                        <Fragment>
                            <Tooltip title="Write a post" placement='top'>
                                <IconButton  >
                                    <EditOutlinedIcon color="primary" />
                                </IconButton>
                            </Tooltip>

                            <Link to="/">
                                <Tooltip title="Home" placement='top'>
                                    <IconButton  >
                                        <EditOutlinedIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Link>

                            <Tooltip title="Write a post" placement='top'>
                                <IconButton  >
                                    <EditOutlinedIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Fragment>
                    ) : 
                        (<Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>

                        </Fragment>)
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
