import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useState } from "react";
import backGroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
// import Slider from "../components/Slider"
import NewSlider from "../components/NewSlider";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // console.log(movies);

  return (
    <Container>
      <NavBar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backGroundImage}
          alt="background-image"
          className="background-image"
        />
      </div>
      <div className="container">
        <div className="logo">
          <img src={MovieLogo} alt="Movie Logo" />
        </div>
        <div className="buttons flex">
          <button
            className="flex j-center a-center"
            onClick={() => navigate("/player")}
          >
            <FaPlay /> Play
          </button>
          <button className="flex j-center a-center">
            <AiOutlineInfoCircle /> More Info{" "}
          </button>
        </div>
      </div>
    <NewSlider movies={movies} />
    </Container>
  );
}

// const Container = styled.div`
//   background-color: black;

//   .hero {
//     position: relative;

//     .background-image {
//       filter: brightness(60%);
//     }

//     img {
//       height: 100vh;
//       width: 100vw;
//     }
//   }

//   .container {
//     position: absolute;
//     bottom: 5rem;

//     .logo img {
//       width: 100%;
//       height: 100%;
//       margin-left: 5rem;
//     }

//     .buttons {
//       margin: 5rem;
//       gap: 2rem;

//       button {
//         font-size: 1.5rem;
//         gap: 1rem;
//         border-radius: 0.2rem;
//         padding: 0.5rem;
//         padding-left: 2rem;
//         padding-right: 2.4rem;
//         border: none;
//         cursor: pointer;
//         transition: 0.3s ease-in-out;

//         &:hover {
//           opacity: 0.8;
//         }

//         &:nth-of-type(2) {
//           background-color: rgba(109, 109, 110, 0.5);
//           color: white;

//           svg {
//             font-size: 1.8rem;
//           }
//         }
//       }
//     }
//   }
// `;

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
  }
  .container {
    position: absolute;
    bottom: 5rem;
    .logo {
      img {
        width: 100%;
        height: 100%;
        margin-left: 5rem;
      }
    }
    .buttons {
      margin: 5rem;
      gap: 2rem;
      button {
        font-size: 1.5rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.5);
          color: white;
          svg {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;