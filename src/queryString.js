export default class QueryString {
  host_port = undefined
  need_to_get_host_port = false
  need_to_set_wsuri = typeof this.wsUri === 'undefined'

  constructor(wsUri) {
    this.wsUri = wsUri
    if (this.need_to_set_wsuri) {
      window.wsUri = 'ws://@HOST_PORT@/MiniParse'
      this.need_to_get_host_port = typeof this.host_port === 'undefined'
    } else {
      this.need_to_get_host_port =
        typeof this.host_port === 'undefined'
          ? this.wsUri.indexOf('HOST_PORT') === -1
          : true
    }

    if (this.need_to_get_host_port) {
      // ws://localhost:10501/
      if (window.location.host !== '')
        this.host_port = 'ws://' + window.location.host + '/'
      else this.host_port = 'ws://localhost:10501/'
    }

    // wsUri check
    if (this.wsUri.indexOf('@HOST_PORT') !== -1) {
      while (this.host_port.endsWith('/')) {
        this.host_port = this.host_port.substring(0, this.host_port.length - 1)
      }

      if (this.wsUri.indexOf('//') === 0) {
        this.wsUri = this.wsUri.substring(2)
      }

      if (
        this.wsUri.indexOf('ws://') === 0 ||
        this.wsUri.indexOf('wss://') === 0
      ) {
        if (
          this.host_port.indexOf('ws://') === 0 ||
          this.host_port.indexOf('wss://') === 0
        ) {
          this.wsUri = this.wsUri.replace(
            /ws:\/\/@HOST_PORT@/im,
            this.host_port
          )
          this.wsUri = this.wsUri.replace(
            /wss:\/\/@HOST_PORT@/im,
            this.host_port
          )
        } else {
          this.wsUri = this.wsUri.replace(/@HOST_PORT@/im, this.host_port)
        }
      } else {
        if (
          this.host_port.indexOf('ws://') === 0 ||
          this.host_port.indexOf('wss://') === 0
        ) {
          this.wsUri = this.wsUri.replace(/@HOST_PORT@/im, this.host_port)
        } else {
          this.wsUri =
            'ws://' + this.wsUri.replace(/@HOST_PORT@/im, this.host_port)
        }
      }
    }
  }

  setQueryString = () => {
    const query_string = {}
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i in vars) {
      const pair = vars[i].split('=')
      // If first entry with this name
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1])
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === 'string') {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])]
        query_string[pair[0]] = arr
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]))
      }
    }
    return query_string
  }
}
