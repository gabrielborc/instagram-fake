import 'react-native-gesture-handler';

import * as Stores from './src/stores';

import { AppRegistry, SafeAreaView } from 'react-native';
import { dark as darkTheme, mapping } from '@eva-design/eva';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'mobx-react';
import React from 'react';
import Routes from './src/routes';
import { name as appName } from './app.json';

const ProviderConfigured = () => (
    <Provider {...Stores}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
            <SafeAreaView style={{ flex: 1 }}>
                <Routes />
            </SafeAreaView>
        </ApplicationProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ProviderConfigured);
