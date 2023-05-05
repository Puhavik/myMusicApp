import React, { createContext, useState, useCallback } from 'react';

const FavoriteArtistsContext = createContext();

export const FavoriteArtistsProvider = ({ children }) => {
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    const handleAddFavoriteArtist = useCallback((newArtist) => {
        // Check if the artist is already in the favorites list
        const isArtistInFavorites = favoriteArtists.some(artist => artist.mbid === newArtist.mbid);

        // If the artist is not in the favorites list, add them
        if (!isArtistInFavorites) {
            const updatedFavoriteArtists = [...favoriteArtists, newArtist];
            setFavoriteArtists(updatedFavoriteArtists);
        }
    }, [favoriteArtists]);

    // Function handleRemoveFavoriteArtist
    const handleRemoveFavoriteArtist = useCallback((mbid) => {
        const updatedFavoriteArtists = favoriteArtists.filter(artist => artist.mbid !== mbid);
        setFavoriteArtists(updatedFavoriteArtists);
    }, [favoriteArtists]);

    return (
        <FavoriteArtistsContext.Provider value={{ favoriteArtists, handleAddFavoriteArtist, handleRemoveFavoriteArtist }}>
            {children}
        </FavoriteArtistsContext.Provider>
    );
};

export default FavoriteArtistsContext;
