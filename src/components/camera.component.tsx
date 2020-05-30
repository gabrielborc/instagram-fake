import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
import { Icon } from '@ui-kitten/components';

import { RNCamera, TakePictureOptions } from 'react-native-camera';

interface Props {
    onTakeCamera: (uri?: string) => void
    status: boolean
}

const windowHeight = Dimensions.get('window').height - (StatusBar.currentHeight || 0);

export class Camera extends Component<Props, any> {

    constructor(props) {
        super(props);

        this.state = {
            camDirection: RNCamera.Constants.Type.front
        }
    }

    toggleCamDirection() {
        const camDirection = this.state.camDirection === RNCamera.Constants.Type.front ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front;
        this.setState({ camDirection });
    }

    render() {
        const PendingView = () => (
            <View style={styles.pendingView}><Text>Carregando...</Text></View>
        )

        const { status } = this.props;

        return (<View>
            {status  && 
                <View style={styles.container}> 
                    <RNCamera
                        captureAudio={false}
                        style={styles.preview}
                        type={this.state.camDirection}
                        androidCameraPermissionOptions={{
                            title: 'Permissão para usar camera',
                            message: 'Precisamos da sua permissão para fotografar',
                            buttonPositive: 'OK!',
                            buttonNegative: 'Cancel'
                        }}
                    >
                        {({ camera, status,  }) => {
                            if (status !== 'READY') return <PendingView />
                            return (
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={() => this.toggleCamDirection()} style={styles.toggle}>
                                        <Icon name='swap-outline' fill='#fff' style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                        <Icon name='camera-outline' fill='#000' style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.cancel()} style={styles.cancel}>
                                        <Icon name='close-outline' fill='#FF0000' style={styles.icon} />
                                    </TouchableOpacity>
                                </View>  
                            );
                        }}
                    </RNCamera>
                </View>}
        </View>);
    }

    takePicture = async (camera: RNCamera) => {
        const { onTakeCamera } = this.props;
        const options: TakePictureOptions = {
            quality: 0.5,
            base64: true
        }
        try {
            const data = await camera.takePictureAsync(options);
            onTakeCamera(data.uri);
        } catch (error) {
            console.log(error);
        }
    }

    cancel = () => {
        const { onTakeCamera } = this.props;
        onTakeCamera();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        height: windowHeight,
        width: 'auto',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    icon: {
        width: 32,
        height: 32,
    },
    toggle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        margin: 20
    },
    capture: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 20,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    cancel: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        margin: 20
    },
    titlePhoto: {
        fontSize: 14
    },
    pendingView: {
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center'
    }
});