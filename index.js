import NfcManager, { ByteParser, NfcTech, NfcEvents } from 'react-native-nfc-manager'

class TagObject {
  constructor (rawData) {
    this._id = rawData.id
  }

  get id () {
    return this._id
  }

  async authenticate (keyType, sector, key) {
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
const stateListeners = []

class MFCwrapper {
  get NfcManager () {
    return NfcManager
  }

  async isMFCsupported () {
    return NfcManager.isSupported(NfcTech.MifareClassic)
  }

  async start () {
    if (!await this.isMFCsupported()) throw new Error('MFC not supported')

    NfcManager.setEventListener(NfcEvents.StateChanged, data => stateListeners.forEach(listener => listener(data)))
    this.onStateChanged(() => {
      NfcManager.cancelTechnologyRequest()
    })

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
    if (!__enabled) return false // Service not started yet

    const listenFn = () => {
      NfcManager.registerTagEvent()
        .then(() => NfcManager.requestTechnology(NfcTech.MifareClassic))
        .then(() => NfcManager.getTag())
        .then(async tag => await callback(new TagObject(tag)))
        .finally(() => {
          NfcManager.cancelTechnologyRequest()
          NfcManager.unregisterTagEvent()
          listenFn()
        })
    }

    listenFn()
    return true
  }

  onStateChanged (listener) {
    stateListeners.push(listener)
  }
}

export { ByteParser }
export default new MFCwrapper()
