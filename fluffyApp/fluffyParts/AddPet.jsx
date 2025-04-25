import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from 'react-native-image-picker';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddPet = ({ pet }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(pet?.image || null);
    const [name, setName] = useState(pet?.name || null);
    const [age, setAge] = useState(pet?.age || null);
    const [weight, setWeight] = useState(pet?.weight || null);
    const [breed, setBreed] = useState(pet?.breed || null);
    const [feeding, setFeeding] = useState(pet?.feeding || null);
    const [activity, setActivity] = useState(pet?.activity || null);
    const [preferences, setPreferences] = useState(pet?.preferences || null);

    const uploadImage = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) setImage(result);
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const handleClearImage = () => {
        setImage(null);
    };

    const clearInput = (setter) => {
        setter('');
    };

    const savePet = async () => {
        try {
            const newPet = {
                id: pet?.id || Date.now().toString(),
                image,
                name,
                age,
                weight,
                breed,
                feeding,
                activity,
                preferences,
            };
    
            for (const key in newPet) {
                if (!newPet[key]) {
                    console.error(`Field ${key} must be filled!`);
                    return;
                }
            }
    
            const storedPets = await AsyncStorage.getItem("pets");
            let pets = storedPets ? JSON.parse(storedPets) : [];
    
            if (pet) {
                pets = pets.map(p => (p.id === pet.id ? newPet : p));
            } else {
                pets.push(newPet);
            }
    
            await AsyncStorage.setItem("pets", JSON.stringify(pets));
    
            alert(pet ? "Pet updated successfully!" : "Pet saved successfully!");

            navigation.navigate('HomeScreen');
        } catch (error) {
            alert("Error saving pet:", error);
        }
    };
    
    return (
        <View style={styles.container}>


            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={styles.title}>{pet ? 'Edit pet' : 'Add pet'}</Text>
            </View>

            <Image source={require('../appAssets/decor/empty.png')} style={{width: 234, height: height * 0.17, marginBottom: height * 0.05, alignSelf: 'center'}} />

            <ScrollView style={{width: '100%'}}>
                <View style={{height: 15}} />
                <TouchableOpacity style={styles.imageContainer} onPress={uploadImage}>
                    {
                        image ? (
                            <Image source={{uri: image}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}} />
                        ) : (
                            <Image source={require('../appAssets/decor/image.png')} style={{width: 88, height: 80, resizeMode: 'contain'}} />
                        )
                    }
                    {image ? (
                        <TouchableOpacity style={[styles.clearBtn, {top: -12, right: -10, width: 32, height: 32}]} onPress={handleClearImage}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={name}
                        onChangeText={setName}
                    />
                    {name ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setName)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Age in years"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric" 
                    />
                    {age ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setAge)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Weight in kg"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric" 
                    />
                    {weight ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setWeight)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Breed"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={breed}
                        onChangeText={setBreed}
                    />
                    {breed ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setBreed)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.notes}
                        placeholder="Feeding notes"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={feeding}
                        onChangeText={setFeeding}
                        multiline
                    />
                    {feeding ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setFeeding)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.notes}
                        placeholder="Activity notes"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={activity}
                        onChangeText={setActivity}
                        multiline
                    />
                    {activity ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setActivity)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.notes}
                        placeholder="Pet Preferences"
                        placeholderTextColor="rgba(0, 82, 25, 0.7)"
                        value={preferences}
                        onChangeText={setPreferences}
                        multiline
                    />
                    {preferences ? (
                        <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setPreferences)}>
                            <Icons type={'clear'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

            </ScrollView>

            <TouchableOpacity 
                style={[styles.addBtn, (!image | !name || !age || !weight || !breed || !feeding || !activity || !preferences) && {backgroundColor: '#939393'}]} 
                onPress={savePet}
                disabled={!image || !name || !age || !weight || !breed || !feeding || !activity || !preferences}
                >
                <Text style={styles.addBtnText}>Add pet</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
    },

    back: {
        width: 42,
        height: 42,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginRight: 20
    },

    title: {
        fontSize: 30,
        fontWeight: '900', 
        color: '#fff',
        textAlign: 'center'
    },

    imageContainer: {
        width: 152,
        height: 152,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
    },

    input: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 17.5,
        paddingLeft: 16,
        paddingRight: 40,
        color: '#005219',
        fontWeight: '800',
        fontSize: 16,
    },

    notes: {
        width: '100%',
        minHeight: 124,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 17.5,
        paddingLeft: 16,
        paddingRight: 40,
        marginBottom: 5,
        color: '#005219',
        fontWeight: '800',
        fontSize: 16
    },

    clearBtn: {
        width: 28,
        height: 28,
        position: 'absolute',
        top: 14.5,
        right: 10,
        zIndex: 10 
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
        alignSelf: 'center',
        marginTop: 20
    },

    addBtnText: {
        fontSize: 19,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
    }

});

export default AddPet;