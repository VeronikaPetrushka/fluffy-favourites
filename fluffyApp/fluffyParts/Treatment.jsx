import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Treatment = ({ treatment }) => {
    const navigation = useNavigation();

    const deleteTreatment = async () => {
        try {
            const storedTreatments = await AsyncStorage.getItem("treatments");
            if (storedTreatments) {
                let treatmentsArray = JSON.parse(storedTreatments);
                treatmentsArray = treatmentsArray.filter(t => t.id !== treatment.id);
                await AsyncStorage.setItem("treatments", JSON.stringify(treatmentsArray));
                navigation.goBack('');
            }
        } catch (error) {
            console.error("Error deleting treatment:", error);
        }
    };    

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={[styles.action, {marginRight: 10}]} onPress={() => navigation.navigate('AddTreatmentScreen', {treatment: treatment})}>
                        <Icons type={'edit'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={deleteTreatment}>
                        <Icons type={'delete'} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={require('../appAssets/decor/empty.png')} style={styles.image} />

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.name}>{treatment.purpose}</Text>

                {
                    treatment.name && (
                        <>
                            <Text style={styles.label}>Vaccine Name</Text>
                            <Text style={styles.value}>{treatment.name}</Text>
                        </>
                    )
                }

                {
                    treatment.title && (
                        <>
                            <Text style={styles.label}>Title</Text>
                            <Text style={styles.value}>{treatment.title}</Text>
                        </>
                    )
                }

                {
                    treatment.date && (
                        <>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.value}>{treatment.date}</Text>
                        </>
                    )
                }

                {
                    treatment.dosage && (
                        <>
                            <Text style={styles.label}>Dosage</Text>
                            <Text style={styles.value}>{treatment.dosage}</Text>
                        </>
                    )
                }

                {
                    treatment.date && (
                        <>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.value}>{treatment.date}</Text>
                        </>
                    )
                }

                {
                    treatment.startDate && (
                        <>
                            <Text style={styles.label}>Admission start date</Text>
                            <Text style={styles.value}>{treatment.startDate}</Text>
                        </>
                    )
                }

                {
                    treatment.deadlineDate && (
                        <>
                            <Text style={styles.label}>Admission deadline date</Text>
                            <Text style={styles.value}>{treatment.deadlineDate}</Text>
                        </>
                    )
                }

                {
                    (treatment.clinic.name || treatment.clinic.address || treatment.clinic.phone) && (
                        <>
                            <Text style={[styles.name, {fontSize: 19}]}>Veterinary clinic contacts</Text>

                            {
                                treatment.clinic.name && (
                                    <>
                                        <Text style={styles.label}>Name</Text>
                                        <Text style={styles.value}>{treatment.clinic.name}</Text>
                                    </>
                                )
                            }
                            {
                                treatment.clinic.address && (
                                    <>
                                        <Text style={styles.label}>Address</Text>
                                        <Text style={styles.value}>{treatment.clinic.address}</Text>
                                    </>
                                )
                            }
                            {
                                treatment.clinic.phone && (
                                    <>
                                        <Text style={styles.label}>Phone</Text>
                                        <Text style={styles.value}>{treatment.clinic.phone}</Text>
                                    </>
                                )
                            }
                        </>
                    )
                }

            </ScrollView>

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
    },

    action: {
        width: 42,
        height: 42,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },

    image: {
        width: 234,
        height: 184,
        marginBottom: 15,
        alignSelf: 'center'
    },

    name: {
        fontSize: 25,
        fontWeight: '800', 
        color: '#fff',
        marginBottom: 13
    },

    label: {
        fontSize: 14,
        fontWeight: '300', 
        color: '#fff',
        lineHeight: 20,
        marginBottom: 3
    },

    value: {
        fontSize: 14,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
        marginBottom: 16
    }

});

export default Treatment;