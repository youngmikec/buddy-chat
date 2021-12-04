import React, { Component } from 'react';
import axios from 'axios';
import testScreams from '../schema/screams';
import Scream from '../components/scream';
// MUI imports
import Grid from '@material-ui/core/Grid';



class Home extends Component {

    state = {
        screams: null
    }
    url = `http://localhost:5000/screams`;

    checkUserCredentials(){
        const user = localStorage.getItem('user');
        return user ? true : false;
    }

    componentDidMount(){
        if(this.checkUserCredentials()){
            axios.get(this.url)
            .then( res => {
                this.setState({
                    screams: res.data.payload
                })
            }).catch(err => console.log(err));
        }else{
            window.location = '/login';
        }

    }

    render() {
        let screamMarkup = this.state.screams ? this.state.screams.map(scream => <Scream key={scream._id} scream={scream}/>) : <p className="m-2">Loading ...</p>;
        return (
           <Grid container spacing={4}> 
               <Grid item sm={8} xs={12}>
                   { screamMarkup }
               </Grid>
               <Grid item sm={4} xs={12}>
                   <p>Profile ...</p>
               </Grid>
           </Grid>
        )
    }
}

export default Home;
