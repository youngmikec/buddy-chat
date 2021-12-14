import React, { Component } from 'react';
import axios from 'axios';
import Scream from '../components/scream';
import Profile from '../components/profile';
// MUI imports
import Grid from '@material-ui/core/Grid';



class Home extends Component {

    state = {
        screams: null,
        user: {}
    }
    url = `http://localhost:5000/screams`;
    

    checkUserCredentials(){
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        return ( user && token ) ? {isAuthenticated: true, user} : {isAuthenticated: false, user};
    }

    componentDidMount(){
        const {isAuthenticated, user} = this.checkUserCredentials();
        console.log('user', this.state.user);
        if(isAuthenticated){
            axios.get(this.url)
            .then( res => {
                this.setState({
                    screams: res.data.payload,
                    user: user
                })
            }).catch(err => console.log(err));
        }else{
            window.location = '/login';
        }

    }

    render() {
        // let authenticated = (localStorage.getItem('token') && localStorage.getItem('user')) ? true : false;
        const {isAuthenticated, user} = this.checkUserCredentials();
        let screamMarkup = this.state.screams ? this.state.screams.map(scream => <Scream key={scream._id} scream={scream}/>) : <p className="m-2">Loading ...</p>;
        return (
           <Grid container spacing={4}> 
               <Grid item sm={8} xs={12}>
                   { screamMarkup }
               </Grid>
               <Grid item sm={4} xs={12}>
                   <Profile authenticated={isAuthenticated} user={user}></Profile>
               </Grid>
           </Grid>
        )
    }
}

export default Home;
