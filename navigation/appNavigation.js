import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import MovieScreen from '../Screens/MovieScreen';
import PersonScreen from '../Screens/PersonScreen';
import SearchScreen from '../Screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function appNavigation () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
                <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen}/>
                <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen}/>
                <Stack.Screen name="Search" options={{headerShown:false}} component={SearchScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}