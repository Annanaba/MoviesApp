import React from "react";
import { Card, Tag } from 'antd';
import './MovieCard.css'
import { format } from 'date-fns';


const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex === -1 ? truncated + '...' : truncated.slice(0, lastSpaceIndex) + '...';
};



const formatDate = (dateString) => {
  if (!dateString) {
    return "Date not available"; // Заглушка, если дата отсутствует
  }
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy'); // Форматируем дату, если она валидна
  } catch (error) {
    console.error("Invalid date value:", dateString); // Логируем ошибку
    return "Invalid date"; // Заглушка, если дата некорректна
  }
};



const MovieCard = ({movie}) => {
  const placeholderGenres = ['Action', 'Adventure'];
    return (
        <Card
          hoverable
          className="movie-card"
          cover={
          <img className="img-card"
            alt={movie.title} 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            />
          }
        >
          <h2 className="name-movie">{movie.title}</h2>
          <p className="data-release">{formatDate(movie.release_date)}</p>
          <div className="genres">
            {placeholderGenres.map((genre, index) =>(
              <Tag key={index} className="genre-tag">{genre}</Tag>
            ))}
          </div>
          <p className="description">{truncateText(movie.overview, 100)}</p>
        </Card>
    );
};

export default MovieCard;