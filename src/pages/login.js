import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import appIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';


import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';

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


class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    url = 'http://localhost:5000/auth/login';

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const { email, password } = this.state;
        const userData = { email, password };
        console.log('userData', userData);

        axios.post(this.url, userData)
        .then(({data}) => {
            console.log('data', data);
            localStorage.setItem('user', JSON.stringify(data.payload));
            localStorage.setItem('token', data.token);
            this.setState({loading: false});
            window.location = '/';
            // this.props.history.push('/');
        })
        .catch( err => {
            console.log('err', err)
            this.setState({loading: false});
            // this.setState({
            //     errors: err.response.data,
            //     loading: false
            // }) 
        })
        
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>  
                <Grid item sm/>
                <Grid item sm>
                    <img src={appIcon} className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email"
                            type="email"
                            label="Email" 
                            className={classes.textField} 
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />

                        <TextField 
                            id="password" 
                            name="password"
                            type="password"
                            label="Password" 
                            className={classes.textField} 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                            { loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            ) }
                        </Button>
                        
                        <br/>
                        <br/>
                        <small>
                            Dont have an account? sign up <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
} 

export default withStyles(styles)(Login);
