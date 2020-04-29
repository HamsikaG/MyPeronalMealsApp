import React from 'react';
import {View, Text, Button, StyleSheet, FlatList } from 'react-native';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import { CATEGORIES } from '../data/dummy-data';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useSelector } from 'react-redux';


const initialState = {output:10}
const mockStore = configureStore()

const CategoryMealsScreen = props => {
    const store = mockStore(initialState)
    const catid = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);
//useSelector takes a function, A function which will be executed by react-redux automatically.
// const rootReducer = combineReducers({
 // meals: mealsReducer //state.meals
// });

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catid) >= 0
    );

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        );
    }

    return (
        <Provider store={store}>
            <MealList listData={displayedMeals} navigation={props.navigation} />
        </Provider>
    );
    
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;