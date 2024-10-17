import React, { useState, useEffect, useCallback } from "react";  
import { Input, Col, Row, Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';
import './Seach.css';
import MovieList from "../List/MovieList";


const Search = ({query,setQuery, results, setResults}) => {
  // const [query, setQuery] = useState('');  // Запрос от пользователя
  // const [movies, setMovies] = useState([]); // Найденные фильмы
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [noResults, setNoResults] = useState(false); // Нет результатов
  const [error, setError] = useState(''); // Состояние ошибки
  const [totalResults, setTotalResults] = useState(0); // Общее количество результатов
  const [currentPage, setCurrentPage] = useState(1);

  // Функция для получения фильмов
  const fetchMovies = async (searchQuery, page) => {
    if(!searchQuery) {

    setLoading(false);
    setResults([]);
    setTotalResults(0);
    setNoResults(false);
    return;
    }

    setLoading(true);
    setNoResults(false);
    setError('');

    if (!navigator.onLine) {
      setError('Нет подключения к сети. Проверьте ваше интернет-соединение.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${searchQuery}&page=${page}`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить фильмы');
      }

      const data = await response.json();
      if (data.results.length === 0) {
        setNoResults(true);
      }


      setResults(data.results || []);
      setTotalResults(data.total_results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce((searchQuery) => {
    fetchMovies(searchQuery, 1);
  }, 1000), []);


  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);  // Обновляем состояние query
    debouncedFetchMovies(value);  // Запускаем поиск с задержкой
    setCurrentPage(1);
  };


  useEffect(() => {
    if (query) {
      fetchMovies(query, currentPage);
    }
  }, [query,currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  

  return (
      <div className="movie-list-container">
              <Input 
             placeholder="Type to search..."
             value={query}
             onChange={handleSearch}
             className="movie-search-input"
             />
             {error &&   <Alert
            message="Ошибка"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px' }}
          />}
             {loading && ( <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin  size="large" />
          </div>)}
              {!loading && noResults && 
              <Alert 
              type="info" 
              message='Не найдено ни одного фильма'
              showIcon
              style={ {marginBottom: '20px'}}
              />} 
              {!loading && !noResults && <MovieList movies={results} />}
              {!loading && query && results.length > 0 && (
                <Pagination
                  current={currentPage}
                  total={totalResults} 
                  onChange={handlePageChange}
                  pageSize={20} 
                  align="center" 
                  showSizeChanger={false}
                  
                />
              )}
      </div>
  )
};

export default Search;