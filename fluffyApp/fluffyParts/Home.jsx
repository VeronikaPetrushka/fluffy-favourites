import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [pets, setPets] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchPets();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchPets();
        }, [pets])
    );

    const fetchPets = async () => {
        try {
            const storedPets = await AsyncStorage.getItem("pets");
            if (storedPets) {
                setPets(JSON.parse(storedPets));
            }
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Home</Text>

            {
                pets.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            pets.map((pet, index) => (
                                <TouchableOpacity key={index} style={styles.petCard} onPress={() => navigation.navigate('PetScreen', {pet: pet})}>
                                    <Image source={{uri: pet.image}} style={styles.petImage} />
                                    <View style={{height: '100%', justifyContent: 'space-between'}}>
                                        <Text style={styles.petName}>{pet.name}</Text>
                                        <Text style={styles.petBreed}>{pet.breed}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        <View style={{height: 150}} />
                    </ScrollView>
                ) : (
                    <View style={{width: '100%', alignItems: 'center', marginTop: height * 0.1}}>
                        <Image source={require('../appAssets/decor/empty.png')} style={{width: 334, height: height * 0.24, resizeMode: 'contain'}} />
                        <Text style={styles.emptyText}>You don't have any pets added here yet...</Text>
                    </View>
                )
            }

            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddPetScreen')}>
                <Text style={styles.addBtnText}>Add pet</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 30,
        fontWeight: '900', 
        marginBottom: 33,
        color: '#fff',
        textAlign: 'center'
    },

    emptyText: {
        fontSize: 20,
        fontWeight: '900', 
        color: '#fff',
        lineHeight: 23,
        textAlign: 'center'
    },

    petCard: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    petImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 10
    },

    petName: {
        fontSize: 20,
        fontWeight: '800', 
        color: '#005219',
        lineHeight: 23,
        marginTop: 15
    },

    petBreed: {
        fontSize: 11,
        fontWeight: '800', 
        color: '#fff',
        lineHeight: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: '#ff8fe1'
    },

    addBtn: {
        width: 354,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: '#ff8fe1',
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center'
    },

    addBtnText: {
        fontSize: 19,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
    }

});

export default Home;