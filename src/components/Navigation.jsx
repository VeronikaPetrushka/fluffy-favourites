
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Navigation = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.button, {backgroundColor: activeButton === 'HomeScreen' ? '#ff8fe1' : '#fff'}]} 
                onPress={() => handleNavigate('HomeScreen')}>
                <View style={{width: 31, height: 34}}>
                    <Icons type={'1'} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, {backgroundColor: activeButton === 'ArticlesScreen' ? '#ff8fe1' : '#fff'}]} 
                onPress={() => handleNavigate('ArticlesScreen')}>
                <View style={{width: 28, height: 37}}>
                    <Icons type={'2'} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, {backgroundColor: activeButton === 'TreatmentsScreen' ? '#ff8fe1' : '#fff'}]} 
                onPress={() => handleNavigate('TreatmentsScreen')}>
                <View style={{width: 37, height: 43}}>
                    <Icons type={'3'} />
                </View>            
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, {backgroundColor: activeButton === 'QuizScreen' ? '#ff8fe1' : '#fff'}]} 
                onPress={() => handleNavigate('QuizScreen')}>
                <View style={{width: 35, height: 37}}>
                    <Icons type={'4'} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, {backgroundColor: activeButton === 'SettingsScreen' ? '#ff8fe1' : '#fff'}]} 
                onPress={() => handleNavigate('SettingsScreen')}>
                <View style={{width: 35, height: 35}}>
                    <Icons type={'5'} />
                </View>            
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 354,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: 9,
        paddingHorizontal: 15.5,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    
    button: {
        width: 59,
        height: 59,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ff8fe1',
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default Navigation;
