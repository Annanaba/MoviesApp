import React from "react";
import { useState, useEffect } from 'react';
import { Spin, Alert, Pagination } from 'antd';
import PropTypes from 'prop-types';
import MovieList from "../List/MovieList";
import './Rated.css'
import { useGuestSession } from "../Context/GuestSessionContext";


const Rated = () => {
  const guestSessionId = useGuestSession();
  const[ratedMovies, setRatedMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [noResults, setNoResults] = useState(false); 
  const [totalResults, setTotalResults] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);



  const fetchRatedMovies = async (page= 1) =>{
    setNoResults(false);

     try{
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&page=${page}`);
      const data = await response.json();
      if(data.results.length === 0){
        setNoResults(true)
      }

      setRatedMovies(data.results);
      setTotalResults(data.total_results);
    } catch(error){
      setError('Ошибка при загрузке оценённых фильмов');
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    if(guestSessionId){
      fetchRatedMovies(currentPage);
    }
  }, [guestSessionId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="rated-container">
          {error && (
            <Alert
              message="Ошибка"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )}
          {loading && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          )}
          {!loading && noResults && (
            <Alert
              type="info"
              message="Вы не оценили ни одного фильма"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )}
          {!loading && !noResults && ratedMovies.length > 0 && (
            <MovieList movies={ratedMovies} />
          )}
          {!loading && !noResults && (
            <Pagination
              current={currentPage} 
              total={totalResults}
              pageSize={20} 
              onChange={handlePageChange} 
              showSizeChanger={false} 
              align="center" 
            />
          )}
    </div>
  );
};


export default Rated;
