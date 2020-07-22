import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from './Movies/UpdateForm'
import AddMovieForm from "./Movies/AddMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
      <Link className='add-movie' to='/add-movie'>Add a Movie</Link>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id' render={() => <UpdateForm />} />
      <Route path='/add-movie' render={() => <AddMovieForm />} />
    </>
  );
};

export default App;
