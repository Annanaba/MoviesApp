import React, { useEffect, useState} from "react";
import MovieCard from "./Cards/MovieCard";
import { Row, Col, Spin, Alert } from 'antd';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const fetchMovies = async () => {
        
      setError(null);
      setLoading(true);

      

      if(!navigator.onLine) {
        setError('Нет подключения к сети. Проверьте ваше интренет-соединение.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=return`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить фильмы');
        }


        const data = await response.json();
        setMovies(data.results || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false)
        }
      };

    useEffect(() => {
        fetchMovies();
    }, []);

    const moviesWithImageFirst = movies.sort((a, b) => {
      if (a.poster_path && !b.poster_path) return -1;
      if (!a.poster_path && b.poster_path) return 1;
      return 0;
    })


    return (
      <div>
        {error && (
          <Alert
            message="Ошибка"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large" />
          </div>
        ) : (
          <div className="movie-list-container">
            <Row justify="center" gutter={[36, 36]}>
              {moviesWithImageFirst.map(movie => (
                <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
    
  
};

export default MovieList;