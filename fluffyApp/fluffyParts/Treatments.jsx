import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const categories = ['All', 'Vaccination', 'Record of veterinarian visits', 'Medications'];

const Treatments = () => {
    const navigation = useNavigation();
    const [treatments, setTreatments] = useState([]);
    const [category, setCategory] = useState('All');

    console.log(treatments)

    useFocusEffect(
        useCallback(() => {
            fetchTreatments();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchTreatments();
        }, [treatments])
    );

    const fetchTreatments = async () => {
        try {
            const storedTreatments = await AsyncStorage.getItem("treatments");
            if (storedTreatments) {
                setTreatments(JSON.parse(storedTreatments));
            }
        } catch (error) {
            console.error("Error retrieving treatments:", error);
        }
    };
    
    const data = category === 'All' 
    ? treatments 
    : category === 'Vaccination' 
        ? treatments.filter((t) => t.purpose === 'Vaccination')
        : category === 'Record of veterinarian visits' 
            ? treatments.filter((t) => t.purpose === 'Record of veterinarian visits')
            : category === 'Medications' 
                ? treatments.filter((t) => t.purpose === 'Medications')
                : [];

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Treatment</Text>

            {
                treatments.length > 0 && (
                    <View style={{height: 42, marginBottom: 20}}>
                        <ScrollView horizontal>
                            {
                                categories.map((c, i) => (
                                    <TouchableOpacity 
                                        key={i} 
                                        style={[styles.categoryBtn, category === c && {backgroundColor: '#fff'}]} 
                                        onPress={() => setCategory(c)}
                                        >
                                        <Text style={[styles.categoryBtnText, category === c && {color: '#005219'}]}>{c}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>    
                    </View>
                )
            }

            {
                treatments.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            data.map((treatment, index) => (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('TreatmentScreen', {treatment: treatment})}>
                                    <Text style={styles.purpose}>{treatment.purpose}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image source={{uri: treatment.pet.image}} style={styles.petImage} />
                                        <Text style={styles.petName}>{treatment.pet.name}</Text>
                                    </View>
                                    <Text style={styles.date}>{treatment.date}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        <View style={{height: 170}} />
                    </ScrollView>
                ) : (
                    <View style={{width: '100%', alignItems: 'center', marginTop: height * 0.1}}>
                        <Image source={require('../appAssets/decor/empty.png')} style={{width: 334, height: height * 0.24, resizeMode: 'contain'}} />
                        <Text style={styles.emptyText}>There is nothing here yet...</Text>
                    </View>
                )
            }

            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddTreatmentScreen')}>
                <Text style={styles.addBtnText}>Add treatment</Text>
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

    categoryBtn: {
        paddingVertical: 10,
        paddingHorizontal: 18.5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginRight: 3,
        height: 42
    },

    categoryBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 20,
        color: 'rgba(255, 255, 255, 0.5)'
    },

    card: {
        width: '100%',
        height: 124,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        justifyContent: 'space-between'
    },

    petImage: {
        width: 35,
        height: 35,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 10
    },

    petName: {
        fontSize: 20,
        fontWeight: '800', 
        color: '#005219',
        lineHeight: 23,
    },

    purpose: {
        fontSize: 11,
        fontWeight: '800', 
        color: '#fff',
        lineHeight: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: '#ff8fe1',
    },

    date: {
        fontSize: 11,
        fontWeight: '300', 
        color: '#005219',
        lineHeight: 20,
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

export default Treatments;