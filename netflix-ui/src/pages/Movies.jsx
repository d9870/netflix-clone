import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-auth";
import { styled } from "styled-components";
import Navbar from "../components/NavBar";
import NewSlider from "../components/NewSlider";
import NotAvilable from "../components/NotAvilable";
import Genres from "../components/Genres";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "movie" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) {
    //   console.log(currentUser);
    // //   navigate("/");
    // }
  });

  console.log(movies);
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <Genres genres={genres} type="movie" />
        {movies.length ? <NewSlider movies={movies} /> : <NotAvilable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .Not-avilable {
      color: white;
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
