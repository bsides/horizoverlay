// eslint-disable-next-line max-classes-per-file
const overlayWindowId = undefined;
const querieSet = undefined;

const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search);

class ActWebsocketInterface {
  constructor(uri, path = 'MiniParse') {
    // url check
    const querySet = this.getQuerySet();
    if (typeof querySet.HOST_PORT !== 'undefined') {
      this.uri = querySet.HOST_PORT + path;
    } else {
      this.uri = uri;
    }
    this.id = null;
    this.activate = false;

    document.addEventListener('onBroadcastMessage', (evt) => this.onBroadcastMessage(evt));
    document.addEventListener('onRecvMessage', (evt) => this.onRecvMessage(evt));
    window.addEventListener('message', (e) => {
      if (e.data.type === 'onBroadcastMessage') {
        this.onBroadcastMessage(e.data);
      }
      if (e.data.type === 'onRecvMessage') {
        this.onRecvMessage(e.data);
      }
    });
  }

  connect() {
    if (typeof this.websocket !== 'undefined' && this.websocket !== null) {
      this.close();
    }
    this.activate = true;
    this.websocket = new WebSocket(this.uri);
    this.websocket.addEventListener('open', (evt) => {
      this.onopen(evt);
    });
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    this.websocket.onmessage = (evt) => {
      this.onmessage(evt);
    };
    this.websocket.onclose = (evt) => {
      this.onclose(evt);
    };
    this.websocket.addEventListener('error', (evt) => {
      this.onerror(evt);
    });
  }

  close() {
    this.activate = false;
    if (this.websocket !== null && typeof this.websocket !== 'undefined') {
      this.websocket.close();
    }
  }

  onopen() {
    // get id from useragent
    if (this.id !== null && typeof this.id !== 'undefined') {
      this.setId(this.id);
    } else if (typeof overlayWindowId !== 'undefined') {
      this.setId(overlayWindowId);
    } else {
      const r = new RegExp(
        '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'
      );
      const id = r.exec(navigator.userAgent);
      if (id !== null && id.length === 1) {
        this.setId(id[0]);
      }
    }
  }

  onclose() {
    this.websocket = null;
    if (this.activate) {
      setTimeout(() => {
        this.connect();
      }, 5000);
    }
  }

  onmessage(evt) {
    if (evt.data === '.') {
      // ping pong
      this.websocket.send('.');
    } else {
      try {
        const obj = JSON.parse(evt.data);
        const { type } = obj;
        if (type === 'broadcast') {
          document.dispatchEvent(new CustomEvent('onBroadcastMessage', { detail: obj }));
        }
        if (type === 'send') {
          document.dispatchEvent(new CustomEvent('onRecvMessage', { detail: obj }));
        }
        if (type === 'set_id') {
          // document.dispatchEvent(new CustomEvent('onIdChanged', { detail: obj }));
        }
      } catch {
        // ignore
      }
    }
  }

  onerror(evt) {
    console.error(evt);
    this.websocket.close();
  }

  getQuerySet() {
    const querySet = {};
    // get query
    const query = window.location.search.slice(1);
    const vars = query.split('&');
    for (const var_ of vars) {
      try {
        const pair = var_.split('=');
        querieSet[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      } catch {
        // ignore
      }
    }
    return querySet;
  }

  broadcast(type, msg) {
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.setId(overlayWindowId);
    }
    const obj = {
      type: 'broadcast',
      msgType: type,
      msg,
    };
    this.websocket.send(JSON.stringify(obj));
  }

  send(to, type, msg) {
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.setId(overlayWindowId);
    }
    const obj = {
      type: 'send',
      msgType: type,
      to,
      msg,
    };
    this.websocket.send(JSON.stringify(obj));
  }

  overlayAPI(type, msg) {
    const obj = {};
    if (typeof overlayWindowId !== 'undefined' && this.id !== overlayWindowId) {
      this.setId(overlayWindowId);
    }
    obj.type = 'overlayAPI';
    obj.to = overlayWindowId;
    obj.msgtype = type;
    obj.msg = msg;
    this.websocket.send(JSON.stringify(obj));
  }

  setId(id) {
    const obj = { type: 'set_id', id };
    this.id = overlayWindowId;
    this.websocket.send(JSON.stringify(obj));
  }

  // eslint-disable-next-line no-unused-vars
  onRecvMessage(e) {}

  // eslint-disable-next-line no-unused-vars
  onBroadcastMessage(e) {}
}

class WebSocketImpl extends ActWebsocketInterface {
  constructor(uri, path = 'MiniParse') {
    super(uri, path);
  }

  // send(to, type, msg)
  // broadcast(type, msg)
  // eslint-disable-next-line no-unused-vars
  onRecvMessage(e) {}

  onBroadcastMessage(e) {
    if (e.detail.msgtype === 'CombatData') {
      document.dispatchEvent(new CustomEvent('onOverlayDataUpdate', e));
    }
  }
}

export default function initActWebSocket() {
  if (!getHost()) {
    return;
  }
  let webs;
  const url = new URLSearchParams(window.location.search);
  const wsUri = `${url.get('HOST_PORT')}MiniParse` || undefined;
  if (wsUri) {
    webs = new WebSocketImpl(wsUri);
    try {
      webs.connect();
    } catch (error) {
      console.error(error);
    }
    if (document.addEventListener) {
      window.addEventListener('beforeunload', () => {
        webs.close();
      });
      window.addEventListener(
        'unload',
        () => {
          webs.close();
        },
        false
      );
    }
  }
}
