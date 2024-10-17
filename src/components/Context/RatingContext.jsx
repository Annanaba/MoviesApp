import React, { createContext, useState} from "react";

export const RatingContext = createContext();

export const RatingsProvider = ({children}) => {
    const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem('ratings');
    return savedRatings ? JSON.parse(savedRatings) : {};
}); 


const updateRating = (movieId, newRating) => {
  setRatings(ratings => ({
    ...ratings, 
    [movieId]: newRating 
  }));

  const updatedRatings = {
    ...ratings,
    [movieId]: newRating,
  };
  localStorage.setItem('ratings', JSON.stringify(updatedRatings));
};


  return (
    <RatingContext.Provider value={{ ratings, updateRating }}>
      {children}
    </RatingContext.Provider>
  );

}