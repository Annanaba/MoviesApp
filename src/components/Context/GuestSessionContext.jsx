import React, {createContext, useContext, useState, useEffect} from "react";

const GuestSessionContext = createContext();

export const useGuestSession = () => useContext(GuestSessionContext);

export const GuestSessionProvider = ({children}) => {
    const [guestSessionId, setGuestSessionId] = useState(null);

    const createGuestSession = async () => {

            const existingSessionId = localStorage.getItem('guestSessionId');
            if (existingSessionId) {
                setGuestSessionId(existingSessionId)
                console.log('Существующая сессия:', existingSessionId);
                return;
            }

            try {
                const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);

                const data = await response.json();

                localStorage.setItem('guestSessionId', data.guest_session_id);
                setGuestSessionId(data.guest_session_id);

                console.log('Гостевая сессия создана: ' , data.guest_session_id );
            } catch (error) {
                console.error('Ошибка при создании гостевой сессии:');
            }
        };

        useEffect(() => {
            createGuestSession();
        }, []);

        return (
            <GuestSessionContext.Provider value={guestSessionId}>
                {children}
            </GuestSessionContext.Provider>
        );
    };


