import NfcManager, { ByteParser, NfcTech } from 'react-native-nfc-manager'

class TagObject {
  constructor (rawData) {
    this.rawData = { ...rawData }
    console.log(rawData)
  }

  get id () {
    return this.rawData.id
  }

  authenticate (keyType, sector, key) {
    switch (keyType) {
      case 'A':
        return NfcManager.mifareClassicAuthenticateA(sector, key)
      case 'B':
        return NfcManager.mifareClassicAuthenticateB(sector, key)
      default:
        throw new Error('Invalid key type!')
    }
  }

  async getSectorCount () {
    return NfcManager.mifareClassicGetSectorCount()
  }

  async getBlockCountInSector (sector) {
    return NfcManager.mifareClassicGetBlockCountInSector(sector)
  }

  async sectorToBlockNo (sector) {
    return NfcManager.mifareClassicSectorToBlock(sector)
  }

  async readBlock (block, opts) {
    const { sector, key, keyType } = opts || {}
    if (sector && key && keyType) {
      await this.authenticate(keyType, sector, key)
    }
    return NfcManager.mifareClassicReadBlock(block)
  }

  async readSector (sector, opts) {
    const { key, keyType } = opts || {}
    if (key && keyType) {
      await this.authenticate(keyType, sector, key)
    }
    return NfcManager.mifareClassicReadSector(sector)
  }
}

let __enabled = false

class MFCwrapper {
  get NfcManager () {
    return NfcManager
  }

  async isMFCsupported () {
    return NfcManager.isSupported(NfcTech.MifareClassic)
  }

  async start () {
    if (!await this.isMFCsupported()) throw new Error('MFC not supported')
    // NfcManager.onStateChanged(

    return NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(nfcEnabled => {
        if (!nfcEnabled) {
          throw new Error('NFC disabled!')
        }
        __enabled = true
      })
  }

  listen (callback) {
    if (!__enabled) return false

    const listenFn = () => {
      NfcManager.registerTagEvent()
        .then(() => NfcManager.requestTechnology(NfcTech.MifareClassic))
        .then(() => NfcManager.getTag())
        .then(tag => {
          callback(new TagObject(tag))
        })
        .finally(() => {
          NfcManager.cancelTechnologyRequest()
          NfcManager.unregisterTagEvent()
          listenFn()
        })
    }

    listenFn()
    return true
  }
}

export { ByteParser }
export default new MFCwrapper()
