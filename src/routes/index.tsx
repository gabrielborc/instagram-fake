import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Home from '../containers/home';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export enum ROUTES_NAMES {
  Home = "Home",
}

@inject('homeStore')
@observer
class Routes extends React.Component<any, any> {
    render() {
        const { photoReady: headerStatus } = this.props.homeStore;

        return (
            <NavigationContainer>
              <StatusBar backgroundColor="black" barStyle="dark-content" />
              <Stack.Navigator initialRouteName={ROUTES_NAMES.Home}>
                <Stack.Screen options={{
                  headerShown: !headerStatus,
                  headerTitleAlign: 'center',
                  headerTitle: 'Unifacef Gram',
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: 'black',
                  }
                }} name={ROUTES_NAMES.Home} component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }
}

export default Routes;