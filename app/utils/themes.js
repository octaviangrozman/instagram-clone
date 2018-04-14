import { Platform } from 'react-native'

const boxShadow = Platform.select({
    ios: `shadow-color: #555;
        shadow-offset: {width: 0, height: 2};
        shadow-opacity: 0.8;
        shadow-radius: 2;`,
    android: `elevation: 2;`
  })

export const mainTheme = {
    boxShadow,
    brandColor: '#e1306c',
    brandBlue: '#3897f0',
    purple: '#c13584',
    textColor: '#555',
    gray: '#ddd',
    borderColor: '#ccc',
    borderRadius: '4'
}
