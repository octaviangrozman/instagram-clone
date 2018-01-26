import { Platform } from 'react-native'

const SERVER_URL = __DEV__ ?
  Platform.select({
    ios: "http://localhost:8080",
    android: "http://192.168.0.101:8080" // REPLACE WITH YOUR LOCAL IP ADDRESS
  }) :
  "https://my-production-url.com" // TO BE ADDED

export default SERVER_URL