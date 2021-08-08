import './App.css'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MediaGrid from './components/MediaGrid'
import Pagination from '@material-ui/lab/Pagination'
import MuiAlert from '@material-ui/lab/Alert'
import Axios from 'axios'

var API_KEY = 'api_key=eba8c9c65d5f5b42ad417304c14cba4c';
var BASE_WEB_URL = 'https://api.themoviedb.org/3';
var BASE_MOVIE_URL = BASE_WEB_URL + '/movie/now_playing?' + API_KEY;
var SEARCH_MOVIE_URL = BASE_WEB_URL + '/search/movie?' + API_KEY;
var pageNum = 1;

function App() {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchMedia = async() => {
    await Axios.get(BASE_MOVIE_URL)
            .then(function (res) {
                setMedia(res.data.results);
                setTotalPages(res.data.total_pages);
            })
            .catch(function (error){
                console.log(error);
            })
            .then(function () {

            });  
  }

  useEffect(()=>{
   fetchMedia();
  }, []);

  const changeSearchInput = (text) => {
      setSearch(text)
      pageNum = 1;
      searchMedia(text)
  }

  const changePage = (event, value) => {
      pageNum = value;
      searchMedia(search);
  }

  const searchMedia = async (e) => {
      console.log(e);

      let url = SEARCH_MOVIE_URL + '&query=' + e + '&page=' + pageNum;
      let url2 = BASE_MOVIE_URL + '&page=' + pageNum;
     
      if(e)
          await Axios.get(url)
          .then(function (res) {
              setMedia(res.data.results);
              setTotalPages(res.data.total_pages);
          })
          .catch(function (error){
              console.log(error);
          })
          .then(function () {

          }); 
      else{
          await Axios.get(url2)
          .then(function (res) {
              setMedia(res.data.results);
              setTotalPages(res.data.total_pages);
          })
          .catch(function (error){
              console.log(error);
          })
          .then(function () {

          }); 
      }
           
  }

  return (
    <React.Fragment>
      <Header media={media} onAdd={changeSearchInput}/>

      {media.length < 1 && <MuiAlert severity="error" variant="filled" style={{justifyContent: "center", Width: "100%"}}>No results found</MuiAlert>}
      <MediaGrid media={media}/>
      
      <Pagination color="primary" style={{display: "flex", paddingBottom: "2em", justifyContent: "center"}} defaultPage={1} page={pageNum} count={totalPages} onChange={changePage}/>

      <Footer/>
    </React.Fragment>
  );
}

export default App;