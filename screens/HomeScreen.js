//
// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import FavoriteArtistsContext from '../screens/FavoriteArtistsContext';
//
// export default function HomeScreen({ navigation }) {
//     // Get favorite artists from context
//     const { favoriteArtists, handleRemoveFavoriteArtist } = useContext(FavoriteArtistsContext);
//     // Initialize state for search text input
//     const [searchText, setSearchText] = useState('');
//
//     return (
//         <View style={styles.container}>
//             {/*Render the title text*/}
//             <Text style={styles.title}>Vikentiy Pukhaev - 01547637</Text>
//             {/*Render the search container with input and search icon*/}
//             <View style={styles.searchContainer}>
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Suche nach Band oder Musiker:in"
//                     onChangeText={text => setSearchText(text)}
//                 />
//                 <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { searchText })}>
//                     <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
//                 </TouchableOpacity>
//             </View>
//             {/*Render the favorite artists container*/}
//             <View style={styles.favoriteArtistsContainer}>
//                 {/*Render a message when there are no favorite artists*/}
//                 {favoriteArtists.length === 0 ? (
//                     <Text style={styles.noFavoritesText}>Keine Favoriten hinzugefügt. Suchen und fügen Sie Ihre Lieblingskünstler hinzu.</Text>
//                 ) : (
//                     // Render a list of favorite artists
//                     <FlatList
//                         data={favoriteArtists}
//                         renderItem={({ item }) => (
//                             <View style={styles.item}>
//                                 <TouchableOpacity
//                                     onPress={() => navigation.navigate('ArtistDetails', { mbid: item.mbid })}
//                                     style={styles.itemTextContainer}
//                                 >
//                                     <Text style={styles.itemText}>{item.name}</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => handleRemoveFavoriteArtist(item.mbid)}
//                                     style={styles.deleteButton}
//                                 >
//                                     <Ionicons name="trash-outline" size={24} color="black" />
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                         keyExtractor={item => item.mbid}
//                     />
//                 )}
//             </View>
//         </View>
//     );
// }
//
// // Styles for the HomeScreen
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginVertical: 16,
//         alignSelf: 'center',
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 2,
//         borderColor: 'black',
//         borderRadius: 16,
//         marginBottom: 16,
//         paddingHorizontal: 8,
//         alignSelf: 'center',
//     },
//     searchInput: {
//         flex: 1,
//         paddingVertical: 8,
//         marginLeft: 8,
//         fontSize: 16,
//         color: 'black',
//     },
//     searchIcon: {
//         marginRight: 8,
//     },
//     favoriteArtistsContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     item: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//         paddingVertical: 16,
//         paddingHorizontal: 16,
//         borderRadius: 16,
//         marginBottom: 8,
//         width: '75%',
//     },
//     itemTextContainer: {
//         flex: 1,
//     },
//     itemText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     deleteButton: {
//         marginLeft: 8,
//     },
//     noFavoritesText: {
//         fontSize: 16,
//         fontStyle: 'italic',
//         marginTop: 16,
//         textAlign: 'center',
//     },
// });

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FavoriteArtistsContext from '../screens/FavoriteArtistsContext';

export default function HomeScreen({ navigation }) {
    // Get favorite artists from context
    const { favoriteArtists, handleRemoveFavoriteArtist } = useContext(FavoriteArtistsContext);
    // Initialize state for search text input
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            {/*Render the title text*/}
            <Text style={styles.title}>Vikentiy Pukhaev - 01547637</Text>
            {/*Render the search container with input and search icon*/}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Suche nach Band oder Musiker:in"
                    onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { searchText })}>
                    <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
            {/*Render the favorite artists container*/}
            <View style={styles.favoriteArtistsContainer}>
                {/*Render a message when there are no favorite artists*/}
                {favoriteArtists.length === 0 ? (
                    <Text style={styles.noFavoritesText}>Keine Favoriten hinzugefügt. Suchen und fügen Sie Ihre Lieblingskünstler hinzu.</Text>
                ) : (
                    // Render a list of favorite artists
                    <FlatList
                        data={favoriteArtists}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigation.navigate('ArtistDetails', { mbid: item.mbid })}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleRemoveFavoriteArtist(item.mbid)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="trash-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.mbid}
                        style={styles.list}
                    />
                )}
            </View>
        </View>
    );
}

// Styles for the HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
        alignSelf: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        paddingHorizontal: 8,
        alignSelf: 'center',
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
    },
    searchIcon: {
        marginRight: 8,
    },
    favoriteArtistsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: 8,
    },
    noFavoritesText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 16,
        textAlign: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
        marginTop: 8,
    },
});
