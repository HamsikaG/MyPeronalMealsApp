
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Provider } from 'react-redux';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals'; //setFilters -- actiion creator function

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};


const FiltersScreen = props => {

    const { navigation } = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const dispatch = useDispatch();


    const saveFilters = useCallback(() => {
        console.log("Inside saveFilters about to dispatch action - appliedFilters - " + appliedFilters);
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
         dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);
    //saveFilters should change only when state changes
    // and by using useCallback, saveFilters only triggers when one of 'isGlutenFree, isLactoseFree, isVegan, isVegetaria' changes


    // useEffect(() => {
    //     navigation.setParams({ save: saveFilters }); // setparms causes navigation to chnage // as naviagtion chnages, useeffect tiggers, infinite loop!!
    // }, [saveFilters, navigation]);
    // // useEffect should run only when saveFilters holds new values - but saveFilters always chnages when state chnages - so just this wont help us
    // // only when navigation changes this will run , when anything else in props chnages useEffect wont run.

    useEffect(() => {
        console.log("Inside useEffect saveFilters "+saveFilters);
        console.log("saveFilters isGlutenFree "+ isGlutenFree +" isLactoseFree "+ isLactoseFree );
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
            <View style={styles.screen}>
                <Text stlye={styles.title}>Available Filters / Restrictions</Text>
                <FilterSwitch
                    label='Gluten-free'
                    state={isGlutenFree}
                    onChange={newValue => setIsGlutenFree(newValue)}
                />
                <FilterSwitch
                    label='Lactose-free'
                    state={isLactoseFree}
                    onChange={newValue => setIsLactoseFree(newValue)}
                />
                <FilterSwitch
                    label='Vegan'
                    state={isVegan}
                    onChange={newValue => setIsVegan(newValue)}
                />
                <FilterSwitch
                    label='Vegetarian'
                    state={isVegetarian}
                    onChange={newValue => setIsVegetarian(newValue)}
                />
            </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
         ),
         headerRight: (
             <HeaderButtons HeaderButtonComponent={HeaderButton}>
                 <Item
                     title='Save'
                     iconName='ios-save'
                    onPress={navData.navigation.getParam('save')}
                 />
             </HeaderButtons>
         )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FiltersScreen;