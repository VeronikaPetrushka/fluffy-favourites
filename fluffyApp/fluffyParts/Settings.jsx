import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Switch, Linking, ScrollView } from "react-native";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Settings = () => {
    const [notifications, setNotifications] = useState(true);

    const toggleNotifications = () => {
        setNotifications((prev) => !prev);
    };

    const TERMS_URL = "https://www.termsfeed.com/live/7dee832b-8946-4a6b-880d-40625c06e09c";
    const APPSTORE_URL = "https://apps.apple.com/us/app/fluffy-pet-care/id6745454322";


    const seeTerms = () => {
        Linking.openURL(TERMS_URL).catch((err) =>
            Alert.alert("Error", "Unable to open Privacy Policy")
        );
    };
    
    const giveFeedback = () => {        
        Linking.openURL(APPSTORE_URL).catch((err) =>
            Alert.alert("Error", "Unable to open store page")
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <Image source={require('../appAssets/decor/empty.png')} style={{width: 334, height: height * 0.24, resizeMode: 'contain', marginBottom: 20}} />

            <ScrollView style={{width: '100%'}}>
                <View style={[styles.btn, {marginBottom: 20, borderRadius: 10}]}>
                    <Text style={styles.btnText}>Notification</Text>
                    <Switch value={notifications} onValueChange={toggleNotifications} thumbColor="#fff" trackColor={{ false: "#ccc", true: "#34e553" }} />
                </View>

                <Text style={styles.subTitle}>Units of measurement</Text>

                <View style={styles.btn}>
                    <Text style={styles.btnText}>Weight</Text>
                    <Text style={styles.value}>kg</Text>
                </View>
                <View style={[styles.btn, {marginBottom: 20}]}>
                    <Text style={styles.btnText}>Age</Text>
                    <Text style={styles.value}>years</Text>
                </View>


                <View style={styles.btn}>
                    <Text style={styles.btnText}>Terms of use</Text>
                    <TouchableOpacity style={{width: 12, height: 24}} onPress={seeTerms}>
                        <Icons type={'arrow'} />
                    </TouchableOpacity> 
                </View>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Give feedback</Text>
                    <TouchableOpacity style={{width: 12, height: 24}} onPress={giveFeedback}>
                        <Icons type={'arrow'} />
                    </TouchableOpacity> 
                </View>
                <View style={{height: 120}} />
            </ScrollView>

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

    subTitle: {
        fontSize: 17,
        fontWeight: '400', 
        color: '#fff',
        marginBottom: 10,
        alignSelf: 'flex-start'
    },

    btn: {
        width: '100%',
        paddingVertical: 17,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 5
    },

    btnText: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '800',
        color: '#005219'
    },

    value: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '400',
        color: '#005219'
    }

});

export default Settings;