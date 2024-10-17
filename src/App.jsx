import React, {useState, useEffect} from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Rated from "./components/Rated/Rated";
import { GuestSessionProvider } from "./components/Context/GuestSessionContext";
import { RatingsProvider } from "./components/Context/RatingContext";
import { GenresProvider } from "./components/Context/GenresContext";

function App() {

    const [activeTab, setActiveTab] = useState('search'); // активная вкалдка
    const [searchQuery, setSearchQuery] = useState(''); // запрос от пользователя
    const [searchResults, setSearchResults] = useState([]); //результат поиска ?


    return (
        <div>
            <GuestSessionProvider>
            <RatingsProvider>
            <GenresProvider>
        <Header setActiveTab={setActiveTab} activeTab={activeTab}/>
        <main>
            {activeTab === 'search' &&( 
            <Search
                query={searchQuery}
                setQuery={setSearchQuery}
                results={searchResults}
                setResults={setSearchResults}
            />)}
            {activeTab === 'rated' && <Rated/>}
        </main>
        </GenresProvider>
        </RatingsProvider>
        </GuestSessionProvider>
        </div>
    )
}


export default App;


