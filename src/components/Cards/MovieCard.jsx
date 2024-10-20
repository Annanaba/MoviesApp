import React, { useContext, useEffect, useState } from "react";
import { Card, Tag, Rate } from 'antd';
import './MovieCard.css';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useGuestSession } from "../Context/GuestSessionContext";
import { RatingContext } from "../Context/RatingContext";
import { GenresContext } from "../Context/GenresContext";


const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex === -1 ? truncated + ' ...' : truncated.slice(0, lastSpaceIndex) + '...';
};


const formatDate = (dateString) => {
  if (!dateString) {
    return "Date not available";
  }
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error("Invalid date value:", dateString);
  }
};


const MovieCard = ({  movie = {
  title: 'Неизвестный фильм',
  poster_path: null,
  release_date: 'Дата не указана',
  overview: 'Описание отсутствует',
  genre_ids: [],
}  }) => { 
  const guestSessionId = useGuestSession();
  const { ratings, updateRating } = useContext(RatingContext);
  const currentRating = ratings[movie.id] || 0;
  const [rateColor, setRateColor] = useState('#E90000');
  const genres = useContext(GenresContext);
  const genreIds = movie.genre_ids;


  const getRateColor = (ratings) => {
    if (ratings <= 3) {
      return  '#E90000'; 
    } else if (ratings <= 5) {
      return  '#E97E00'; 
    } else if (ratings <= 7) {
      return '#E9D100'; 
    } else {
      return '#66E900'; 
    }
  };

  useEffect(() => {
    setRateColor(getRateColor(currentRating));
  }, [currentRating]);

  const handleRateChange = async (value) => {
    updateRating(movie.id , value)
    setRateColor(getRateColor(value));

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value }),
        }
      );

      const data = await response.json();
      console.log('Оценка фильма успешно обновлена:', data);
      
    } catch (error) {
      console.log('Ошибка при обновлении фильма:', error.message);
    }

    
  };

  return (
    <Card className="movie-card">
        <img
          className="img-movie"
          alt={movie.title}
          src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
       <div className="movie-details">
        <h2 className="name-movie">{movie.title}</h2>
        <div
          id={`rating-circle-${movie.id}`}
          className="rating-circle"
          style={{ border: `2px solid ${rateColor}`, borderRadius: '50%', padding: '5px' }}
         >
          {currentRating}
         </div>
         <p className="data-release">{formatDate(movie.release_date)}</p>
         <div className="genres">
         {Array.isArray(genreIds) && genreIds.length > 0 ? ( genreIds.map(id => (
          <Tag key={id} className="genre-tag">
            {genres[id]}
          </Tag>
          ))
          ) :<Tag className="genre-tag">Жанры отсутствуют</Tag> }
        </div>
      <p className="description">{truncateText(movie.overview)}</p>
        <Rate
          className="rate"
          value={currentRating}
          onChange={handleRateChange}
          count={10}
          allowHalf
        />
      </div>
    </Card>
  );
};



MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default MovieCard;
