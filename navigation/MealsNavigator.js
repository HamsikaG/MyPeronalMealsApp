
import React from 'react';
import { Text, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { createStackNavigator} from 'react-navigation-stack'
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Ionicons } from '@expo/vector-icons';



const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'MealCategories'
        }
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
}, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
                : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
                : 'Favorites'
        }
    }
};

const MealsFavTabNavigator = createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans'
            },
            activeTintColor: Colors.accentColor
        }
    });

const MainNavigator = createDrawerNavigator(
    {
        MealsFav: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
       // Filters: FiltersNavigator
       Filters: {
            screen: FiltersNavigator,
            navigationOptions: {
                drawerLabel: 'Filter Meals'
            }
        }
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    });

export default createAppContainer(MainNavigator);