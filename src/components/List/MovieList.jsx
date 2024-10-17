import React from "react";
import MovieCard from "../Cards/MovieCard";
import './MovieList.css'

const MovieList = ({ movies }) => {
  const moviesWithImageFirst = movies.sort((a, b) => {
    if (a.poster_path && !b.poster_path) return -1;
    if (!a.poster_path && b.poster_path) return 1;
    return 0;
  });

  return (
    
    <div className="movie-list">
      
      {moviesWithImageFirst.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
