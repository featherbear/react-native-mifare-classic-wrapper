# React Native Mifare Classic Wrapper

[react-native-nfc-manager]: https://github.com/whitedogg13/react-native-nfc-manager/tree/aecd7fd689daedae2039256dda2a23c7e6cd2467
[Expo]: https://expo.io/

This library is a wrapper over [react-native-nfc-manager] (v2.1.9), providing streamlined functionality for Mifare Classic commands. It uses the V1 API and performs working function flows that are incorrect in the the [documentation](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/APIv1.md).

## Compatability / Requirements

* You will need a [React Native](https://reactnative.dev/) project of _version 0.60_ or greater
* **ANDROID ONLY** - Whilst iOS device can read Mifare Classic cards, it does not support reading non-NDEF payloads. No support for iOS is given

_If you are using the [Expo] framework, you will need to [eject] your application in order to use this, as NFC is not supported by [Expo]. Alternatively, try out [this](https://codersera.com/blog/running-expo-react-native-together/)_

## Installation

1) `npm install featherbear/react-native-mifare-classic-wrapper`  
2) `npx react-native link react-native-nfc-manager`  
n) Follow the [original project readme](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/README.md) for other things

