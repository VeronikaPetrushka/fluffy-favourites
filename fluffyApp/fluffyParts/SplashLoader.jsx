import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const fluffyLoaders = [
    require('../appAssets/fluffyLoaders/appLoader1.png'),
    require('../appAssets/fluffyLoaders/appLoader2.png'),
];

const SplashLoader = () => {
    const navigation = useNavigation();

    const slide1 = useRef(new Animated.Value(0)).current;
    const slide2 = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slide1, {
                toValue: -width,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(slide2, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                navigation.replace('HomeScreen');
            }, 1000);
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Animated.Image
                source={fluffyLoaders[0]}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transform: [{ translateX: slide1 }],
                }}
            />
            <Animated.Image
                source={fluffyLoaders[1]}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transform: [{ translateX: slide2 }],
                }}
            />
        </View>
    );
};

export default SplashLoader;
