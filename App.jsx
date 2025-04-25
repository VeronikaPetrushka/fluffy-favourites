import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashLoaderScreen from './fluffyApp/fluffyScreens/SplashLoaderScreen';

import HomeScreen from './fluffyApp/fluffyScreens/HomeScreen';
import AddPetScreen from './fluffyApp/fluffyScreens/AddPetScreen';
import PetScreen from './fluffyApp/fluffyScreens/PetScreen';
import TreatmentsScreen from './fluffyApp/fluffyScreens/TreatmentsScreen';
import AddTreatmentScreen from './fluffyApp/fluffyScreens/AddTreatmentScreen';
import TreatmentScreen from './fluffyApp/fluffyScreens/TreatmentScreen';
import ArticlesScreen from './fluffyApp/fluffyScreens/ArticlesScreen';
import FavoritesScreen from './fluffyApp/fluffyScreens/FavoritesScreen';
import ArticleScreen from './fluffyApp/fluffyScreens/ArticleScreen';
import QuizScreen from './fluffyApp/fluffyScreens/QuizScreen';
import SettingsScreen from './fluffyApp/fluffyScreens/SettingsScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"SplashLoaderScreen" }>    
              <Stack.Screen 
                    name="SplashLoaderScreen" 
                    component={SplashLoaderScreen} 
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
              <Stack.Screen 
                    name="QuizScreen" 
                    component={QuizScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="SettingsScreen" 
                    component={SettingsScreen} 
                    options={{ headerShown: false }} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
