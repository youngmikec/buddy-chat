import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
// import { withStyles } from '@material-ui/core/styles/withStyles';

//MUI imports
import Card from '@material-ui/core/card';
import  CardContent  from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
// import '../../public';



class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, scream: { body, createdAt, userImage, userHandle } } = this.props;
        const styles = {
            card: {
                display: 'flex',
                marginBottom: '20px' 
            },
            image: {
                minWidth: 200+'px',
                objectFit: 'cover',
                // backgroundImage: `url("https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7810895.jpg&imgrefurl=https%3A%2F%2Fwallpapercave.com%2Fcute-profile-wallpapers&tbnid=qG4V5PeOFTtePM&vet=12ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4..i&docid=39eRz7JwYcucoM&w=1344&h=1203&itg=1&q=nice%20profile%20images&ved=2ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4")`
                // backgroundImage: `url("../../public/myPic.jpeg")`
                backgroundImage: `url(${userImage != '' || null || undefined ? userImage : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7810895.jpg&imgrefurl=https%3A%2F%2Fwallpapercave.com%2Fcute-profile-wallpapers&tbnid=qG4V5PeOFTtePM&vet=12ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4..i&docid=39eRz7JwYcucoM&w=1344&h=1203&itg=1&q=nice%20profile%20images&ved=2ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4"})`
            },
            content: {
                padding: 25,
                objectFit: 'cover'
            }
        }
        return (
            <div>
                <Card style={styles.card}>
                    {/* <img src={userImage || "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7810895.jpg&imgrefurl=https%3A%2F%2Fwallpapercave.com%2Fcute-profile-wallpapers&tbnid=qG4V5PeOFTtePM&vet=12ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4..i&docid=39eRz7JwYcucoM&w=1344&h=1203&itg=1&q=nice%20profile%20images&ved=2ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4"} /> */}
                    <CardMedia
                        style={{height: 0, paddingTop: '56.25%'}}
                        image={userImage || "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7810895.jpg&imgrefurl=https%3A%2F%2Fwallpapercave.com%2Fcute-profile-wallpapers&tbnid=qG4V5PeOFTtePM&vet=12ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4..i&docid=39eRz7JwYcucoM&w=1344&h=1203&itg=1&q=nice%20profile%20images&ved=2ahUKEwikpa2omKv0AhUKyRoKHahoDicQMyhMegQIARB4"}
                        title="Profile image"
                        style={styles.image} />

                    <CardContent stylel={styles.content}>
                        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary" >{ userHandle }</Typography>
                        <Typography variant="body2" color="textSecondary">{ dayjs().from(dayjs(createdAt), true)} ago</Typography>
                        <Typography variant="body1" >{ body }</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default  (Scream);
