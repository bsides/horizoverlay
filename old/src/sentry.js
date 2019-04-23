import Raven from 'raven-js'

export const sentryUrl =
  'https://8c84076b24414cfe8295eee17e9e90a9@sentry.io/943062'

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  })
  window && window.console && console.error && console.error(ex)
}
