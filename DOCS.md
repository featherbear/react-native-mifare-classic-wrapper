API Documentation
---

> This library is more-or-less a working subset of the original V1 API documentation found [here](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/APIv1.md).

# Installation

&nbsp;1) `npm install featherbear/react-native-mifare-classic-wrapper`  
&nbsp;2) `npx react-native link react-native-nfc-manager`  
&nbsp;n) Follow the [original project readme](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/README.md) for other things

# Import

```js
import MFC, { ByteParser } from 'react-native-mifare-classic-wrapper'
```

# MFC Manager

The MFC Manager `MFC` is responsible for the initialisation of device settings for Mifare Classic communication

## async `MFC.start()`  

> Initialises the MFC Manager

**CALL ME FIRST!**  
Throws an error if NFC is disabled or if Mifare Classic is not supported

Returns: `Promise`

## async `MFC.isMFCSupported()`

> Checks if the current device supports reading Mifare Classic tags.

Returns: `Promise<boolean>`

## `MFC.NfcManager`

> A reference to the original [NfcManager](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/NfcManager.js) object

Returns: [`NfcManager`](https://github.com/whitedogg13/react-native-nfc-manager/blob/aecd7fd689daedae2039256dda2a23c7e6cd2467/NfcManager.js)

## `MFC.listen(listener)`

> Attaches a callback `listener` that is called when a new tag is detected.  

A [Tag](#Tag) object is passed as the first parameter of the callback

## `MFC.onStateChanged(listener)`

> Attaches a callback `listener` that is called when the device NFC state is modified

An object containing the key `state` is passed as the first parameter of the callback.  
`state` is either `on`, `turning_on`, `off` or `turning_off`.

---

# Tag

The `Tag` object represents a detected Mifare Classic card.

## `<Tag>.id`  

> Gets the UID of the tag

Returns: `String`

## async `<Tag>.authenticate(keyType, sector, key)`  

> Authenticates a given sector in a Tag

* `keyType` - `'A'` or `'B'`
* `sector` - a sector number
* `key` - an array of 6 bytes containing the key

Returns: `Promise`  
Promise resolves if successful, and rejects with an error otherwise.

**Example**  
Authenticate sector 12 with keyA as 0xFFFFFFFFFFFF  
`detectedTag.authenticate('A', 12, [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])`

## async `<Tag>.getSectorCount()`

> Gets the number of sectors on the tag  

Returns: Number

## async `<Tag>.getBlockCountInSector(sector)`

> Gets the number of blocks in the requested sector

Returns: Number

## async `<Tag>.sectorToBlockNo(sector)`

> Finds the first block number for the given sector

Returns: Number

## async `<Tag>.readBlock(block, opts)`

> Reads a requested block.

If sector authentication has not been performed yet, the `sector`, `key`, and `keyType` can be passed as an object into the `opts` parameter.

Returns: `bytes[]`

## async `<Tag>.readSector(sector, opts)`

> Reads the blocks requested sector.

If sector authentication has not been performed yet, the `key` and `keyType` can be passed as an object into the `opts` parameter.

Returns: `bytes[]`

---

# ByteParser

ByteParser is a utility class for working with byte arrays.

## `ByteParser.byteToHexString(bytes)`

> Converts a byte array `byte[]` to a hex string.

Returns: `String`

## `ByteParser.byteToString(bytes)`

> Converts a byte array `byte[]` to a string

Returns: `String`
