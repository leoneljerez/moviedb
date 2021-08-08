import React, {useState, useEffect} from 'react'
import { Button, Dialog, DialogActions, Divider, Typography, List, ListItem, Grid } from '@material-ui/core';
import Axios from 'axios'

var API_KEY = 'api_key=eba8c9c65d5f5b42ad417304c14cba4c';
var BASE_WEB_URL = 'https://api.themoviedb.org/3';
var BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
var ORIG_IMG_URL = 'https://image.tmdb.org/t/p/original';
var BASE_IMDB_URL = 'https://www.imdb.com/title/';

function getMediaUrl(mediaPoster, num) {
    if (num === 1){
        if (mediaPoster != null){
            return ORIG_IMG_URL + mediaPoster
        } else {
            return 'http://via.placeholder.com/750x500'
        }
    } else {
        if (mediaPoster != null){
            return BASE_IMG_URL + mediaPoster
        } else {
            return 'http://via.placeholder.com/500x750'
        }
    }
}

function getIMDBUrl(id) {
    if(id){
        return BASE_IMDB_URL + id;
    }
}

function MediaDetails( {media, openPopup, closePopup} ) {
    const [mediaDetail, setMediaDetail] = useState([]);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);  
    
    const fetchMedia = async() => {
        let url = BASE_WEB_URL + '/movie/' + media + '?' + API_KEY;
        await Axios.get(url)
            .then(function (res) {
                setMediaDetail(res.data);
                setGenres(res.data.genres);
                setLanguages(res.data.spoken_languages);
                console.log(res.data);
            })
            .catch(function (error){
                console.log(error);
            })
            .then(function () {

            });   
    };

    useEffect(() => {     
        fetchMedia();
    }, []);

    return (       
        <>
            <Dialog fullWidth={true} maxWidth='md' open={openPopup}>
                <div className="Popup-Container" >
                    <div className="Popup-Header" style={{backgroundImage: 'url("' + getMediaUrl(mediaDetail.backdrop_path, 1) + '")'}}> 
                        <DialogActions>
                            <Button variant="contained" color="primary" style={{color: 'white'}} onClick={closePopup}>Close</Button>
                        </DialogActions>                   
                    </div>  
                    <div className="Popup-Content">
                        <div className="Popup-Img">
                            <img src={getMediaUrl(mediaDetail.poster_path, 2)} alt="poster" width="300" height="450"/>
                        </div>
                        <div className="Popup-Info-Container">
                            <div className="Popup-Info">
                                
                                <List>
                                    <ListItem>
                                        <Typography variant='h5'>{mediaDetail.title}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                       <div>
                                            <Grid container spacing={1} className="Popup-Categories">
                                                <Typography><b>Genres: </b></Typography>
                                                    {genres.map((media) => ( 
                                                        <Grid item>
                                                            <Typography className="Categories" key={media.id}>{media.name}</Typography>
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                       </div>                                
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <div>
                                            <Grid container spacing={1} className="Popup-Languages">
                                                <Typography><b>Languages: </b></Typography>
                                                {languages.map((media) => ( 
                                                    <Grid item>
                                                        <Typography className="Languages" key={media.id}>{media.english_name}</Typography>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography><b>Release Date: </b>{mediaDetail.release_date}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography><b>Runtime: </b>{mediaDetail.runtime} min</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography><b>Rating: </b>{mediaDetail.vote_average}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography><b>Budget:</b> ${mediaDetail.budget}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography><b>Revenue:</b> ${mediaDetail.revenue}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                        <Typography variant='body1'><b>Overview:</b> {mediaDetail.overview}</Typography>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                    <ListItem>
                                       {mediaDetail.imdb_id && <Button variant="contained" color="secondary" href={getIMDBUrl(mediaDetail.imdb_id)} target="_blank" style={{color: 'black'}}>IMDB</Button>}
                                    </ListItem>
                                </List>    
                            </div>
                        </div>                
                    </div>                           
                </div>       
            </Dialog>
        </>
    )
}

export default MediaDetails;
