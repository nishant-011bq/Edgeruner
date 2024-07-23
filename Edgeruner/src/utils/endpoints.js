export const endpoints = {
  auth: {
    signup: '/account/signup/',
    login: '/account/token/',
    refresh: '/account/token/refresh/',
  },
  user: {
    me: '/account/me/',
  },
  account: {
    trade: '/account/trade-settings',
    upstox: '/upstox',
    telegram: '/telegram',
  },
  devices: {
    getLoggedInDevices: '/account/device',
    deleteLoggedInDevice: '/account/device/:uuid',
  },
  notifications: {
    getAllNotifications: '/account/notification',
    disabledNotifications: '/telegram/disabled-notification',
  },
  holdings: {
    getHoldings: '/upstox/holding',
  },
}
