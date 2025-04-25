import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import articles from '../fluffyConstants/articles';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Articles = () => {
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

            <Text style={styles.title}>Articles</Text>

            <TouchableOpacity style={[styles.favBtn, {top: height * 0.067, right: 20}]} onPress={() => navigation.navigate('FavoritesScreen')}>
                <Icons type={'fav-no'} />
            </TouchableOpacity>

            <ScrollView style={{width: '100%'}}>
                {
                    articles.map((article, index) => (
                        <View key={index} style={{width: '100%', marginBottom: 16}}>
                            <TouchableOpacity style={{marginBottom: 5}} onPress={() => navigation.navigate('ArticleScreen', {article: article})}>
                                <Image source={article.image} style={{width: '100%', height: 212, resizeMode: 'cover', borderRadius: 10}} />
                                <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(article)}>
                                    <Icons type={isFavorite(article) ? 'fav' : 'fav-no'} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <Text style={styles.name}>{article.name}</Text>
                        </View>
                    ))
                }
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

    favBtn: {
        width: 42,
        height: 42,
        paddingVertical: 11,
        paddingHorizontal: 9,
        backgroundColor: '#fff',
        borderRadius: 5,
        position: 'absolute',
        top: 10,
        right: 9
    },

    name: {
        fontSize: 20,
        fontWeight: '900', 
        color: '#fff',
        lineHeight: 22
    }

});

export default Articles;