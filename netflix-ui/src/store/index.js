import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { API_KEY, API_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesarray, genres) => {
  // console.log(results)
  array.forEach((movie) => {
    const moviesGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) moviesGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesarray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: moviesGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesarray = [];
  for (let i = 1; moviesarray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`
       ${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesarray, genres);
  }
  return moviesarray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${API_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    // console.log(data)
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesbygenre",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${API_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "netflix/likedMovies",
  async (email)  => {
    const {data: { movies }} = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const deleteLikedMovie = createAsyncThunk(
  "netflix/deleteLiked",
  async ({email, movieId})  => {
    const {data: { movies }} = await axios.put(`http://localhost:5000/api/user/delete/`,{
      email,movieId
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genresLoaded = true;
      state.genres = action.payload;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(deleteLikedMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
