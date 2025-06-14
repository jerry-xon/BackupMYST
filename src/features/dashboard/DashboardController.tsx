import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { MainRoots } from 'src/navigation/types';
type NavigationProp = NativeStackNavigationProp<MainRoots,'Profile'>;


const useDashboardController = ()=>{
    const [loading,setLoading] = React.useState<boolean>(false)
    const navigation = useNavigation<NavigationProp>()

    const naviagteToProfile = ()=>{
        navigation.navigate("Profile")
    }
  
    return {
      loading,
      naviagteToProfile,
    };
}

export default useDashboardController