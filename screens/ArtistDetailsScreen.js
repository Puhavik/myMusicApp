import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getArtist } from '../api/musicBrainz';
import FavoriteArtistsContext from '../screens/FavoriteArtistsContext';

// Define the ArtistDetailsScreen component to show detailed information about an artist
export default function ArtistDetailsScreen({ route, navigation }) {
    // Get favorite artists and handleAddFavoriteArtist function from the context
    const { favoriteArtists, handleAddFavoriteArtist } = useContext(FavoriteArtistsContext);
    // Initialize state for the artist data and loading status
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch artist details when the component mounts and update the state
    useEffect(() => {
        (async () => {
            const data = await getArtist(route.params.mbid);
            setArtist(data);
            setIsLoading(false);
        })();
    }, [route.params.mbid]);

    // Show a loading indicator while the artist data is being fetched
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Check if the artist is already added to favorites
    const isArtistInFavorites = favoriteArtists.some(favArtist => favArtist.mbid === artist.id);

    // Render the artist details and a list of their release groups (e.g. albums)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{artist.name}</Text>
            <FlatList
                data={artist['release-groups']}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.albumInfo}>
                            <Text style={styles.albumTitle}>{item.title}</Text>
                            <Text>{item['first-release-date'].substring(0, 4)}</Text>
                            <Text>{item['primary-type']}</Text>
                        </View>
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.albumImage} />}
                    </View>
                )}
                keyExtractor={item => item.id}
                style={styles.list}
            />

            {/* Show the "Add to Favorites" button only if the artist is not already in the favorites list */}
            {!isArtistInFavorites && (
                <TouchableOpacity style={styles.button} onPress={() => {
                        handleAddFavoriteArtist({ mbid: artist.id, name: artist.name });
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.buttonText}>Zu Favoriten hinzufügen</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
// Style for ArtistDetails screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
        marginBottom: 0,
    },
    list: {
        flex: 1,
        width: '100%',
        marginTop: 16,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    albumInfo: {
        flex: 1,
    },
    button: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 6,
        marginTop: 5,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        width: '90%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    albumImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 8,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    albumTitle: {
        fontWeight: 'bold',
    },
});

