import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Article = ({ article }) => {
    const navigation = useNavigation();

    const [favorites, setFavorites] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    useEffect(() => {
        fetchFavorites();
    }, [favorites])

    const fetchFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Error retrieving favorite articles:", error);
        }
    };

    const isFavorite = (article) => {
        return favorites.some(fav => fav.name === article.name);
    };

    const toggleFavorite = async (article) => {
        try {
            let updatedFavorites;
            if (isFavorite(article)) {
                updatedFavorites = favorites.filter(fav => fav.name !== article.name);
            } else {
                updatedFavorites = [...favorites, article];
            }

            setFavorites(updatedFavorites);
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(article)}>
                    <Icons type={isFavorite(article) ? 'fav' : 'fav-no'} />
                </TouchableOpacity>
            </View>

            <Image source={article.image} style={styles.image} />

            <Text style={styles.name}>{article.name}</Text>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.text}>{article.description}</Text>
                {
                    article.content.map((item, index) => (
                        <View key={index} style={{width: '100%'}}>
                            <Text style={styles.text}>{item.title}</Text>
                            {item.text.map((t, i) => (<Text key={i} style={[styles.text, {marginLeft: 10}]}> •   {t}</Text>))}
                        </View>
                    ))
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

    favBtn: {
        width: 42,
        height: 42,
        paddingVertical: 11,
        paddingHorizontal: 9,
        backgroundColor: '#fff',
        borderRadius: 5,
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
        fontWeight: '900', 
        color: '#fff',
        marginBottom: 14
    },

    text: {
        fontSize: 16,
        fontWeight: '500', 
        color: '#fff',
        lineHeight: 20,
        marginBottom: 12
    },

});

export default Article;