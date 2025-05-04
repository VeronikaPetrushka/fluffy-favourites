import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashLoader = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                navigation.replace('HomeScreen');
            }, 1000);
        });
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image
                source={require('../appAssets/decor/logo.png')}
                style={{
                    width: '100%',
                    height: 306,
                    opacity: fadeAnim,
                    resizeMode: 'contain'
                }}
            />
        </View>
    );
};

export default SplashLoader;
