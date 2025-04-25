import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddTreatment = ({ treatment }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [purpose, setPurpose] = useState(treatment?.purpose || null);
    const [selectedPet, setSelectedPet] = useState(treatment?.pet || null);
    const [name, setName] = useState(treatment?.name || null);
    const [title, setTitle] = useState(treatment?.title || null);
    const [dosage, setDosage] = useState(treatment?.dosage || null);
    const [clinic, setClinic] = useState(treatment?.clinic || {name: '', address: '', phone: ''});
    const [pickDate, setPickDate] = useState(false);
    const [pickStartDate, setPickStartDate] = useState(false);
    const [pickDeadlineDate, setPickDeadlineDate] = useState(false);

    const [pets, setPets] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchPets();
        }, [])
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

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [date, setDate] = useState(treatment && parseDate(treatment?.date) || new Date());
    const [startDate, setStartDate] = useState( treatment && parseDate(treatment?.startDate) || new Date());
    const [deadlineDate, setDeadlineDate] = useState( treatment && parseDate(treatment?.deadlineDate) || new Date());

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
    const formattedStartDate = `${startDate.getDate().toString().padStart(2, "0")}.${(startDate.getMonth() + 1).toString().padStart(2, "0")}.${startDate.getFullYear()}`;
    const formattedDeadlineDate = `${deadlineDate.getDate().toString().padStart(2, "0")}.${(deadlineDate.getMonth() + 1).toString().padStart(2, "0")}.${deadlineDate.getFullYear()}`;

    const handleDateShow = () => {
        if(pickDate) {
            setPickDate(false)
        } else {
            setPickDate(true)
        }
    };

    const handleStartDateShow = () => {
        if(pickStartDate) {
            setPickStartDate(false)
        } else {
            setPickStartDate(true)
        }
    };

    const handleDeadlineDateShow = () => {
        if(pickDeadlineDate) {
            setPickDeadlineDate(false)
        } else {
            setPickDeadlineDate(true)
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setPickDate(Platform.OS === "ios");
        if (selectedDate) setDate(selectedDate);
    };

    const onChangeStartDate = (event, selectedDate) => {
        setPickStartDate(Platform.OS === "ios");
        if (selectedDate) setStartDate(selectedDate);
    };

    const onChangeDeadlineDate = (event, selectedDate) => {
        setPickDeadlineDate(Platform.OS === "ios");
        if (selectedDate) setDeadlineDate(selectedDate);
    };

    const clearInput = (setter) => {
        setter('');
    };

    const saveTreatment = async () => {
        try {

            let newTreatment;

            if(purpose === 'Vaccination') {
                newTreatment = {
                    id: treatment?.id || Date.now().toString(),
                    purpose,
                    pet: selectedPet,
                    name,
                    date: formattedDate,
                    clinic
                };
            } else if (purpose === 'Record of veterinarian visits') {
                newTreatment = {
                    id: treatment?.id || Date.now().toString(),
                    purpose,
                    pet: selectedPet,
                    date: formattedDate,
                    clinic
                };
            } else if (purpose === 'Medications') {
                newTreatment = {
                    id: treatment?.id || Date.now().toString(),
                    purpose,
                    pet: selectedPet,
                    title,
                    dosage,
                    startDate: formattedStartDate,
                    deadlineDate: formattedDeadlineDate,
                    clinic
                };
            }
    
            for (const key in newTreatment) {
                if (!newTreatment[key]) {
                    console.error(`Field ${key} must be filled!`);
                    return;
                }
            }
    
            const storedTreatments = await AsyncStorage.getItem("treatments");
            let treatments = storedTreatments ? JSON.parse(storedTreatments) : [];
    
            if (treatment) {
                treatments = treatments.map(p => (p.id === treatment.id ? newTreatment : p));
            } else {
                treatments.push(newTreatment);
            }
    
            await AsyncStorage.setItem("treatments", JSON.stringify(treatments));
    
            alert(treatment ? "Treatment updated successfully!" : "Treatment saved successfully!");

            navigation.navigate('TreatmentsScreen');
        } catch (error) {
            alert("Error saving treatment:", error);
        }
    };

    const handleNext = () => {
        if(index === 2) {
            saveTreatment();
            navigation.navigate('TreatmentsScreen')
        } else if (index === 1 && pets.length === 0) {
            navigation.navigate('AddPetScreen')
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 3);
        }
    };
    
    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={styles.title}>{treatment ? 'Edit treatment' : 'Add treatment'}</Text>
            </View>

            {
                index === 0 && (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={[styles.purposeBtn, purpose === 'Vaccination' && {backgroundColor: '#ff8fe1'}]} 
                            onPress={() => setPurpose('Vaccination')}
                            >
                            <Text style={styles.purposeBtnText}>Schedule a vaccination</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.purposeBtn, purpose === 'Record of veterinarian visits' && {backgroundColor: '#ff8fe1'}]} 
                            onPress={() => setPurpose('Record of veterinarian visits')}
                            >
                            <Text style={styles.purposeBtnText}>Schedule a visit to the veterinarian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.purposeBtn, purpose === 'Medications' && {backgroundColor: '#ff8fe1'}]} 
                            onPress={() => setPurpose('Medications')}
                            >
                            <Text style={styles.purposeBtnText}>Medications</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                index === 1 && (
                    <>
                        {pets.length > 0 && <Text style={styles.label}>Choose a pet</Text>}
                        {
                            pets.length > 0 ? (
                                <ScrollView style={{width: '100%'}}>
                                    {
                                        pets.map((pet, index) => (
                                            <TouchableOpacity key={index} style={styles.petCard} onPress={() => setSelectedPet(pet)}>
                                                <Image source={{uri: pet.image}} style={styles.petImage} />
                                                <View style={{height: '100%', justifyContent: 'space-between'}}>
                                                    <Text style={styles.petName}>{pet.name}</Text>
                                                    <Text style={styles.petBreed}>{pet.breed}</Text>
                                                </View>
                                                <View style={styles.select}>
                                                    {pet === selectedPet && <View style={styles.selected} />}
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    <View style={{height: 150}} />
                                </ScrollView>
                            ) : (
                                <View style={{width: '100%', alignItems: 'center', marginVertical: 'auto'}}>
                                    <Image source={require('../appAssets/decor/empty.png')} style={{width: 334, height: height * 0.24, resizeMode: 'contain'}} />
                                    <Text style={styles.emptyText}>You don't have any pets added here yet...</Text>
                                </View>
                            )
                        }
                        <View style={{height: 120}} />
                    </>
                )
            }

            {
                index === 2 && (
                    <View style={{width: '100%', flexGrow: 1}}>
                        <Image source={require('../appAssets/decor/empty.png')} style={{width: 234, height: height * 0.17, marginBottom: height * 0.05, alignSelf: 'center'}} />
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.label}>
                                {
                                    purpose === 'Vaccination' ? 'Vaccination' 
                                    : purpose === 'Record of veterinarian visits' ? 'Record of veterinarian visits' 
                                    : 'Medications'
                                }
                            </Text>
                            {
                                purpose === 'Vaccination' && (
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
                                )
                            }
                            {
                                purpose === 'Medications' && (
                                    <View style={{width: '100%'}}>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Title"
                                                placeholderTextColor="rgba(0, 82, 25, 0.7)"
                                                value={title}
                                                onChangeText={setTitle}
                                            />
                                            {title ? (
                                                <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setTitle)}>
                                                    <Icons type={'clear'} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Dosage mg"
                                                placeholderTextColor="rgba(0, 82, 25, 0.7)"
                                                value={dosage}
                                                onChangeText={setDosage}
                                                keyboardType="numeric" 
                                            />
                                            {dosage ? (
                                                <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setDosage)}>
                                                    <Icons type={'clear'} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>

                                        <Text style={[styles.label, {marginTop: 10}]}>Admission start date</Text>
                                        <View style={styles.inputContainer}>
                                            <TouchableOpacity style={styles.dateInput} onPress={handleStartDateShow}>
                                                <Text style={styles.dateInputText}>{formattedStartDate}</Text>
                                            </TouchableOpacity>
                                            {startDate ? (
                                                <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setStartDate)}>
                                                    <Icons type={'clear'} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>

                                        {pickStartDate && (
                                            <DateTimePicker 
                                                value={treatment ? new Date(startDate) : startDate} 
                                                mode="date" 
                                                display="spinner" 
                                                themeVariant="dark"
                                                onChange={onChangeStartDate} 
                                                style={{alignSelf: 'center'}}
                                            />
                                        )}
    
                                        <Text style={[styles.label, {marginTop: 10}]}>Admission deadline date</Text>
                                        <View style={styles.inputContainer}>
                                            <TouchableOpacity style={styles.dateInput} onPress={handleDeadlineDateShow}>
                                                <Text style={styles.dateInputText}>{formattedDeadlineDate}</Text>
                                            </TouchableOpacity>
                                            {deadlineDate ? (
                                                <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setDeadlineDate)}>
                                                    <Icons type={'clear'} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>

                                        {pickDeadlineDate && (
                                            <DateTimePicker 
                                                value={treatment ? new Date(deadlineDate) : deadlineDate} 
                                                mode="date" 
                                                display="spinner" 
                                                themeVariant="dark"
                                                onChange={onChangeDeadlineDate} 
                                                style={{alignSelf: 'center'}}
                                            />
                                        )}
                                    </View>
                                )
                            }

                            {
                                purpose !== 'Medications' && (
                                    <View style={{width: '100%'}}>
                                        <View style={styles.inputContainer}>
                                            <TouchableOpacity style={styles.dateInput} onPress={handleDateShow}>
                                                <Text style={styles.dateInputText}>{formattedDate}</Text>
                                            </TouchableOpacity>
                                            {date ? (
                                                <TouchableOpacity style={styles.clearBtn} onPress={() => clearInput(setDate)}>
                                                    <Icons type={'clear'} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>

                                        {pickDate && (
                                            <DateTimePicker 
                                                value={treatment ? new Date(date) : date} 
                                                mode="date" 
                                                display="spinner" 
                                                themeVariant="dark"
                                                onChange={onChangeDate} 
                                                style={{alignSelf: 'center'}}
                                            />
                                        )}
                                    </View>
                                )
                            }
                            
                            <Text style={[styles.label, {marginTop: 20}]}>Veterinary clinic contacts</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={purpose === 'Vaccination' ? 'Name' : 'Doctor'}
                                    placeholderTextColor="rgba(0, 82, 25, 0.7)"
                                    value={clinic.name}
                                    onChangeText={(text) => setClinic(prev => ({ ...prev, name: text }))}
                                />
                                {clinic.name ? (
                                    <TouchableOpacity style={styles.clearBtn}onPress={() => setClinic(prev => ({ ...prev, name: '' }))}>
                                        <Icons type={'clear'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    placeholderTextColor="rgba(0, 82, 25, 0.7)"
                                    value={clinic.address}
                                    onChangeText={(text) => setClinic(prev => ({ ...prev, address: text }))}
                                />
                                {clinic.address ? (
                                    <TouchableOpacity style={styles.clearBtn}onPress={() => setClinic(prev => ({ ...prev, address: '' }))}>
                                        <Icons type={'clear'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone"
                                    placeholderTextColor="rgba(0, 82, 25, 0.7)"
                                    value={clinic.phone}
                                    onChangeText={(text) => setClinic(prev => ({ ...prev, phone: text }))}
                                />
                                {clinic.phone ? (
                                    <TouchableOpacity style={styles.clearBtn}onPress={() => setClinic(prev => ({ ...prev, phone: '' }))}>
                                        <Icons type={'clear'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                            
                            <View style={{height: 350}} />
                        </ScrollView>
                    </View>
                )
            }

            <TouchableOpacity 
                style={[styles.addBtn, ((index === 0 && !purpose) ||
                    (index === 1 && pets.length > 0 && !selectedPet) ||
                    ((index === 2 && purpose === 'Vaccination') && (!name || !date)) ||
                    ((index === 2 && purpose === 'Medications') && (!title || !dosage || !startDate || !deadlineDate)) ||
                    ((index === 2 && purpose === 'Record of veterinarian visits') && (!date))
                ) 
                    ? {backgroundColor: '#939393'} 
                    : null]} 
                disabled={
                    (index === 0 && !purpose) ||
                    (index === 1 && pets.length > 0 && !selectedPet) ||
                    ((index === 2 && purpose === 'Vaccination') && (!name || !date)) ||
                    ((index === 2 && purpose === 'Medications') && (!title || !dosage || !startDate || !deadlineDate)) ||
                    ((index === 2 && purpose === 'Record of veterinarian visits') && (!date))
                }
                onPress={handleNext}
                >
                <Text style={styles.addBtnText}>{(index === 1 && pets.length === 0) ? 'Add pet' : index === 2 ? 'Add treatment' : 'Next'}</Text>
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

    purposeBtn: {
        width: 354,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10
    },

    purposeBtnText: {
        fontSize: 16,
        fontWeight: '700', 
        color: '#005219',
        lineHeight: 20,
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

    select: {
        width: 26,
        height: 26,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ff8fe1',
        padding: 5,
        position: 'absolute',
        top: 38,
        right: 10
    },

    selected: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: '#ff8fe1'
    },

    label: {
        fontSize: 19,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
        marginBottom: 6
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

    dateInput: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 17.5,
        paddingLeft: 16,
        paddingRight: 40,
    },

    dateInputText: {
        color: '#005219',
        fontWeight: '800',
        fontSize: 16,
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
        marginTop: 20,
        position: 'absolute',
        bottom: 30
    },

    addBtnText: {
        fontSize: 19,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
    }

});

export default AddTreatment;