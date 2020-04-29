import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { toggleFavorite } from '../store/actions/meals'; //toggleFavorite -- actiion creator function
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { CATEGORIES } from '../data/dummy-data';




const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};



const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch(); // use dispatch return a function - which we store in dispatch

    const toggleFavoriteHandler = useCallback(() => {
        console.log("Inside toggleFavoriteHandler about to dispatch action - toggleFavorite with id - " + mealId);
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);
        // and by using useCallback, toggleFavoriteHandler only triggers when one of 'dispatch, mealId' changes

    useEffect(() => {
        console.log("Inside useEffect toggleFavoriteHandler "+toggleFavoriteHandler);
        console.log("Inside useEffect toggleFav is  "+ props.navigation.getParam('toggleFav'));
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);


    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>
                <ListItem key={ingredient}>{ingredient}</ListItem>
            )}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>
                <ListItem key={step}>{step}</ListItem>
            )}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavorite}
                    />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});


export default MealDetailScreen;