import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity from react-native-gesture-handler
import { searchArtist } from '../api/musicBrainz';

export default function SearchResultsScreen({ route, navigation }) {
    // Initialize state for search results and loading status
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch search results when searchText changes
    useEffect(() => {
        (async () => {
            const data = await searchArtist(route.params.searchText);
            setResults(data.artists);
            setIsLoading(false);
        })();
    }, [route.params.searchText]);

    // Render a loading screen while fetching data
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/*Render a message when there are no search results*/}
            {results.length === 0 ? (
                <Text style={styles.noResultsText}>Keine Ergebnisse gefunden. Versuchen Sie es mit einem anderen Suchbegriff.</Text>
            ) : (
                // Render a list of search results
                <FlatList
                    data={results}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ArtistDetails', { mbid: item.id })}>
                            <Text style={styles.item}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}
        </View>
    );
}

// Style for screen SearchResult
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
        width: '100%',
        marginTop: 8,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    item: {
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noResultsText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 16,
    },
});

