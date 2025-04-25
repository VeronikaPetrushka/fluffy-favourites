import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const screens = ['HomeScreen', 'ArticlesScreen', 'TreatmentsScreen', 'QuizScreen', 'SettingsScreen'];
const icons = ['1', '2', '3', '4', '5'];

const FluffyNavigation = () => {
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

            {
                screens.map((screen, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[styles.button, { backgroundColor: activeButton === screen ? '#ff8fe1' : '#fff' }]} 
                        onPress={() => handleNavigate(screen)}
                    >
                        <View style={{ width: 31, height: 34 }}>
                            <Icons type={icons[index]} />
                        </View>
                    </TouchableOpacity>
                ))
            }

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

export default FluffyNavigation;
