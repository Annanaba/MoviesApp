import React, {createContext, useContext, useEffect, useState} from "react";

const GenresContext = createContext();

export const GenresProvider = ({children}) => {
    const [genres, setGenres] = useState({});
    const getGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
              }
            const data = await response.json();
            
            const newGenres = data.genres.reduce((acc, genre) => {
                acc[genre.id] = genre.name;
                return acc;
            }, {});
    
            setGenres(newGenres);
    
        } catch (error) {
            console.log('Ошибка при получении жанров:', error);
        }
    };
    
    useEffect(() => {
        getGenres();
    }, []);

    return (
        <GenresContext.Provider value={genres}>
            {children}
        </GenresContext.Provider>
    );
};

export { GenresContext };

