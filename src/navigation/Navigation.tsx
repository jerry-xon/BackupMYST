// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './Stack';
import TabNavigator from './Tab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditCover from '@features/uploadmedia/EditCover';
import MediaInformation from '@features/uploadmedia/MediaInformation';
import { MainRoots } from './types';
import Profile from '@features/profile/Profile';
import { getItem, } from 'src/constants/helper';
import { Provider } from 'react-redux';
import store from 'src/store/store';

const Stack = createNativeStackNavigator<MainRoots>();

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const isAuthenticate = async () => {
    const res = await getItem<any>('USER');
    if (res?.token) {
      setIsLoggedIn(true);
    }
    // setItem('USER', {
    //   msg: 'User created successfully',
    //   user: {
    //     fullName: 'Pulkit',
    //     userName: 'isPulkit',
    //     gender: 'male',
    //     dob: '31.12.2003',
    //     avatarURL: '',
    //     mobileNumber: 9799170635,
    //     email: 'Pulkit69@gmail.com',
    //     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt #hashtag',
    //     isActive: true,
    //     isVerified: false,
    //     interestIn: ['AI', 'Meme', 'Technology'],
    //     posts: 0,
    //     followers: 0,
    //     following: 0,
    //     rockets: 0,
    //     wallet: 100,
    //     socialLinks: [],
    //     referralCode: 'PULPU0635',
    //     _id: '68480111d0a7751e9b9d4b0c',
    //     createdAt: '2025-06-10T09:55:29.171Z',
    //     updatedAt: '2025-06-10T09:55:29.171Z',
    //     __v: 0,
    //   },
    //   token:
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0YTEwZGVjZTk4MzY2ZDZmNjNlMTY3Mjg2YWU5YjYxMWQyYmFhMjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXlzdC1vdHAiLCJhdWQiOiJteXN0LW90cCIsImF1dGhfdGltZSI6MTc0OTY0MTExOCwidXNlcl9pZCI6IlQxaW5BYzhsY2JQanB2ak1KaHhMTHgwMk01VzIiLCJzdWIiOiJUMWluQWM4bGNiUGpwdmpNSmh4TEx4MDJNNVcyIiwiaWF0IjoxNzQ5NjQxMTE4LCJleHAiOjE3NDk2NDQ3MTgsInBob25lX251bWJlciI6Iis5MTk3OTkxNzA2MzUiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5MTk3OTkxNzA2MzUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.kV2i5KXI3hWm6-TJ8kzawamRuVw1BOM95hc24JtQedjniNEs5KWtwJrV-P3_6I268wI9j_wyG8zXN0fwPhE6eMLfhP387L5sblhDLZScLVs-iUQ-oDWN_pLh8baEd7kvTxktFN9VlYmcUb6VFnWpR4gmV44xkE20499s86DIJg7ePFWieZE4ETUqDcc8E0T-qlcNONO3u54L-iZYy16TUyxuw0GzGB5KQ46MQVCF0gddu7ziqsH6JcHovjXyD8lMJ-8zrp2GWXjg-Yw0-tnxJrkDtFBOsMCQSegQg9d5sCwxjzKuyxvKCcsk-IE5c4a5-0PD6N3WgfxUlV0c2ZcHmA',
    // });
  };

  React.useEffect(() => {
    isAuthenticate();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          key={String(isLoggedIn)}
          initialRouteName={isLoggedIn ? 'Tabs' : 'AuthFlow'}
          screenOptions={{ headerShown: false, animation: 'fade' }}
        >
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="AuthFlow" component={RootStack} />
          <Stack.Screen name="EditCover" component={EditCover} />
          <Stack.Screen name="MediaInformation" component={MediaInformation} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;
