import ConnectionsManagerClient from './connectionsManager'
import { ERRORS } from '@geckos.io/common/lib/constants'
import { ChannelId } from '@geckos.io/common/lib/types'

export default class PeerConnection {
  localPeerConnection: RTCPeerConnection
  dataChannel: RTCDataChannel
  id: ChannelId

  async connect(connectionsManager: ConnectionsManagerClient) {
    let webRTCPcSupported =
      RTCPeerConnection ||
      webkitRTCPeerConnection ||
      // @ts-ignore
      mozRTCPeerConnection

    if (webRTCPcSupported) {
      const { localPeerConnection, dataChannel, id, userData } = await connectionsManager.connect()

      this.localPeerConnection = localPeerConnection
      this.dataChannel = dataChannel
      this.id = id

      return { userData }
    } else {
      let error = new Error(ERRORS.BROWSER_NOT_SUPPORTED)
      console.error(error.message)
      return { error }
    }
  }
}
