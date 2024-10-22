import React from "react";
import MovieCard from "../Cards/MovieCard";
import PropTypes from 'prop-types';
import './MovieList.css'

const MovieList = ({ movies }) => {
  const moviesWithImageFirst = movies.sort((a, b) => {
    if (a.poster_path && !b.poster_path) return -1;
    if (!a.poster_path && b.poster_path) return 1;
    return 0;
  });

  return (
    <li className="movie-list">
      {moviesWithImageFirst.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
      ))}
    </li>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
