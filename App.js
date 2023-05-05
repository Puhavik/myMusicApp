import React from 'react';
// Import navigation components from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from "react-native-safe-area-context";
enableScreens();

// Import screen components
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ArtistDetailsScreen from './screens/ArtistDetailsScreen';

// Import FavoriteArtists context
import { FavoriteArtistsProvider } from './screens/FavoriteArtistsContext';

// Create a stack navigator
const Stack = createStackNavigator();

// Main App component
export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* Provide FavoriteArtists context to the app*/}
            <FavoriteArtistsProvider>
                <SafeAreaProvider>
                    {/* Set up the navigation container */}
                    <NavigationContainer>
                        {/* Define stack navigator and the order of screens */}
                        <Stack.Navigator>
                            {/* Home screen */}
                            <Stack.Screen name="Home" component={HomeScreen} />
                            {/* Search results screen */}
                            <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
                            {/* Artist details screen */}
                            <Stack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </FavoriteArtistsProvider>
        </GestureHandlerRootView>
    );
}
