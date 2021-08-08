import React from 'react'
import { Toolbar, Typography, AppBar, Container, InputBase, makeStyles } from '@material-ui/core'

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
    bar:{
        position: "fixed",
        padding: "1.15rem 5rem 0 5rem",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
    },
}));

function Header( {media, setMedia, onAdd} ) {
    const classes = useStyles()

    const changeSearch = (e) => {
        e.preventDefault()
        onAdd(e.target.value)
    }

    return (
        <>         
            <AppBar position="static" style={{background: '#404b69'}}>
                <Container maxWidth="lg" >
                    <Toolbar >
                        <Typography className={classes.title} variant="h6" noWrap>
                            The Movie DB
                        </Typography>

                        <InputBase id="search" className="search" label="Search" placeholder="Search" variant="outlined" onChange={changeSearch} />
                    </Toolbar>
                </Container>              
            </AppBar>       
        </>
    )
}

export default Header;