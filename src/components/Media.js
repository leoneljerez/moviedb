import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import MediaDetails from './MediaDetails';

var BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';


// rating colors depending on score. Average IMDB rating is around a 6.6
function getRatingColor(rating) {
	if(rating >= 8)
		return 'green'
	else if (rating >= 6.6)
		return 'orange'
	else
		return 'red'
}

function getMediaUrl(mediaPoster) {
    if (mediaPoster != null){
        return BASE_IMG_URL + mediaPoster
    } else {
        return 'http://via.placeholder.com/500x750'
    }
}



function Media( {media} ) {
    const [openPopup, setPopup] = useState(false);

    const popUpChange = () => {
        setPopup(true)
    }

    const closePopup = () => {
        setPopup(false)
    }

    return (
        <>
            <CardActionArea onClick={popUpChange}>
                <Card key={media.id} >
                    <CardMedia className="" style={{paddingTop: '150%'}} image={getMediaUrl(media.poster_path)} overlay={media.title}/>
                    <Typography className={getRatingColor(media.vote_average)}>{media.vote_average}</Typography>
                    <CardContent className="Card-Content">   
                        <Typography className="Card-Title">{media.title}</Typography> 
                    </CardContent> 
                </Card>                                     
            </CardActionArea>
            {openPopup && <MediaDetails media={media.id} openPopup={openPopup} closePopup={closePopup}/>}   
                      
        </>
    )
}

export default Media;