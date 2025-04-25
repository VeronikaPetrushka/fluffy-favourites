import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Pet = ({ pet }) => {
    const navigation = useNavigation();

    const deletePet = async () => {
        try {
            const storedPets = await AsyncStorage.getItem("pets");
            if (storedPets) {
                let petsArray = JSON.parse(storedPets);
                petsArray = petsArray.filter(p => p.id !== pet.id);
                await AsyncStorage.setItem("pets", JSON.stringify(petsArray));
                navigation.goBack('');
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };    

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={[styles.action, {marginRight: 10}]} onPress={() => navigation.navigate('AddPetScreen', {pet: pet})}>
                        <Icons type={'edit'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={deletePet}>
                        <Icons type={'delete'} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={{uri: pet.image}} style={styles.image} />

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.name}>{pet.name}</Text>

                <Text style={styles.label}>Age</Text>
                <Text style={styles.value}>{pet.age} years</Text>

                <Text style={styles.label}>Weight</Text>
                <Text style={styles.value}>{pet.weight} kg</Text>

                <Text style={styles.label}>Breed</Text>
                <Text style={styles.value}>{pet.breed}</Text>

                <Text style={styles.label}>Feeding notes</Text>
                <Text style={styles.value}>{pet.feeding}</Text>

                <Text style={styles.label}>Activity notes</Text>
                <Text style={styles.value}>{pet.activity}</Text>

                <Text style={styles.label}>Pet preferences</Text>
                <Text style={styles.value}>{pet.preferences}</Text>
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
        width: '100%',
        height: 205,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 13
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

export default Pet;