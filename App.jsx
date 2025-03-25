import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AddPetScreen from './src/screens/AddPetScreen';
import PetScreen from './src/screens/PetScreen';
import TreatmentsScreen from './src/screens/TreatmentsScreen';
import AddTreatmentScreen from './src/screens/AddTreatmentScreen';
import TreatmentScreen from './src/screens/TreatmentScreen';
import ArticlesScreen from './src/screens/ArticlesScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ArticleScreen from './src/screens/ArticleScreen';

enableScreens();

const Stack = createStackNavigator();

const LogoScreen = ({ navigation }) => {
  const progress = new Animated.Value(0);

  useEffect(() => {
      Animated.timing(progress, {
          toValue: 100,
          duration: 1500,
          useNativeDriver: false,
      }).start(() => {
          navigation.replace('HomeScreen');
      });
  }, []);

  return (
    <LinearGradient colors={['#26c642', '#03badc']} style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('./src/assets/decor/logo.png')} style={{ width: 277, height: 306, resizeMode: 'cover'}} />
      </View>
    </LinearGradient>
  );
};

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"LogoScreen" }>    
              <Stack.Screen 
                    name="LogoScreen" 
                    component={LogoScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="AddPetScreen" 
                    component={AddPetScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="PetScreen" 
                    component={PetScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="TreatmentsScreen" 
                    component={TreatmentsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="AddTreatmentScreen" 
                    component={AddTreatmentScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="TreatmentScreen" 
                    component={TreatmentScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="ArticlesScreen" 
                    component={ArticlesScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="FavoritesScreen" 
                    component={FavoritesScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="ArticleScreen" 
                    component={ArticleScreen} 
                    options={{ headerShown: false }} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
