import React from 'react'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Media from './Media'

function MediaGrid( {media} ) {
    return (
        <Container maxWidth="lg" className="Container-Body">
            <Grid container spacing={2} justifyContent={'center'}>     
                    {media.map((media) => (      
                        <Grid item xs={7} sm={4} md={3} key={media.id} >
                            <Media key={media.id} media={media} />  
                        </Grid>                                                                
                    ))}                
            </Grid>    
        </Container>   
    )
}

export default MediaGrid;