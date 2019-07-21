let overlayWindowId = undefined
let querieSet = undefined

const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search)

export default function initActWebSocket() {
  if (!getHost()) return
  var webs
  const url = new URLSearchParams(window.location.search)
  const wsUri = `${url.get('HOST_PORT')}MiniParse` || undefined
  if (wsUri) {
    webs = new WebSocketImpl(wsUri)
    try {
      webs.connect()
    } catch (e) {
      console.log(e)
    }
    if (document.addEventListener) {
      window.onbeforeunload = function() {
        webs.close()
      }
      window.addEventListener(
        'unload',
        function() {
          webs.close()
        },
        false
      )
    }
  }
}

class ActWebsocketInterface {
  constructor(uri, path = 'MiniParse') {
    // url check
    const querySet = this.getQuerySet()
    if (typeof querySet['HOST_PORT'] !== 'undefined') {
      uri = querySet['HOST_PORT'] + path
    }
    this.uri = uri
    this.id = null
    this.activate = false

    document.addEventListener('onBroadcastMessage', evt =>
      this.onBroadcastMessage(evt)
    )
    document.addEventListener('onRecvMessage', evt => this.onRecvMessage(evt))
    window.addEventListener('message', e => {
      if (e.data.type === 'onBroadcastMessage') {
        this.onBroadcastMessage(e.data)
      }
      if (e.data.type === 'onRecvMessage') {
        this.onRecvMessage(e.data)
      }
    })
  }
  connect() {
    if (typeof this.websocket !== 'undefined' && this.websocket !== null)
      this.close()
    this.activate = true
    this.websocket = new WebSocket(this.uri)
    this.websocket.onopen = evt => {
      this.onopen(evt)
    }
    this.websocket.onmessage = evt => {
      this.onmessage(evt)
    }
    this.websocket.onclose = evt => {
      this.onclose(evt)
    }
    this.websocket.onerror = evt => {
      this.onerror(evt)
    }
  }
  close() {
    this.activate = false
    if (this.websocket !== null && typeof this.websocket !== 'undefined') {
      this.websocket.close()
    }
  }
  onopen(evt) {
    // get id from useragent
    if (this.id !== null && typeof this.id !== 'undefined') {
      this.set_id(this.id)
    } else {
      if (typeof overlayWindowId !== 'undefined') {
        this.set_id(overlayWindowId)
      } else {
        const r = new RegExp(
          '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'
        )
        const id = r.exec(navigator.userAgent)
        if (id !== null && id.length === 1) {
          this.set_id(id[0])
        }
      }
    }
  }
  onclose(evt) {
    this.websocket = null
    if (this.activate) {
      setTimeout(() => {
        this.connect()
      }, 5000)
    }
  }
  onmessage(evt) {
    if (evt.data === '.') {
      // ping pong
      this.websocket.send('.')
    } else {
      try {
        const obj = JSON.parse(evt.data)
        let { type } = obj
        if (type === 'broadcast') {
          document.dispatchEvent(
            new CustomEvent('onBroadcastMessage', { detail: obj })
          )
        }
        if (type === 'send') {
          document.dispatchEvent(
            new CustomEvent('onRecvMessage', { detail: obj })
          )
        }
        if (type === 'set_id') {
          //document.dispatchEvent(new CustomEvent('onIdChanged', { detail: obj }));
        }
      } catch (e) {}
    }
  }
  onerror(evt) {
    this.websocket.close()
    console.log(evt)
  }
  getQuerySet() {
    const querySet = {}
    // get query
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      try {
        const pair = vars[i].split('=')
        querieSet[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
      } catch (e) {}
    }
    return querySet
  }

  broadcast(type, msg) {
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.set_id(overlayWindowId)
    }
    const obj = {
      type: 'broadcast',
      msgType: type,
      msg
    }
    this.websocket.send(JSON.stringify(obj))
  }

  send(to, type, msg) {
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.set_id(overlayWindowId)
    }
    const obj = {
      type: 'send',
      msgType: type,
      to,
      msg
    }
    this.websocket.send(JSON.stringify(obj))
  }

  overlayAPI(type, msg) {
    const obj = {}
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.set_id(overlayWindowId)
    }
    obj.type = 'overlayAPI'
    obj.to = overlayWindowId
    obj.msgtype = type
    obj.msg = msg
    this.websocket.send(JSON.stringify(obj))
  }

  set_id(id) {
    const obj = { type: 'set_id', id }
    this.id = overlayWindowId
    this.websocket.send(JSON.stringify(obj))
  }

  onRecvMessage(e) {}

  onBroadcastMessage(e) {}
}

class WebSocketImpl extends ActWebsocketInterface {
  constructor(uri, path = 'MiniParse') {
    super(uri, path)
  }
  //send(to, type, msg)
  //broadcast(type, msg)
  onRecvMessage(e) {}

  onBroadcastMessage(e) {
    if (e.detail.msgtype === 'CombatData') {
      document.dispatchEvent(new CustomEvent('onOverlayDataUpdate', e))
    }
  }
}