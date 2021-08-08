import React from 'react'
import { Container, IconButton, AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
       
    },
}));

function Footer() {
    const classes = useStyles()
    return (
        <> 
            <AppBar position="relative" style={{background: '#404b69'}}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography className={classes.title} style={{color: 'black'}}><small>&copy; Leonel Jerez Jr</small></Typography>
                        <IconButton style={{color: 'black'}} href='#top'>
                            <ExpandLessIcon/>
                        </IconButton>
                    </Toolbar>                
                </Container>
            </AppBar>          
        </>  
    )
}

export default Footer;