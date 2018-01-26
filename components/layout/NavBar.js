import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://maxcdn.icons8.com/windows10/PNG/512/Logos/instagram_new-512.png'}}
          style={{width: 50, height: 50}}
        />
        <Text>Instagram</Text>
        <View style={styles.actions}>
          <Image source={{uri: 'https://image.flaticon.com/icons/png/512/54/54966.png'}}
            style={{width: 25, height: 25}}
          />
          <Image source={{uri: 'http://www.iconsfind.com/wp-content/uploads/2016/01/20160111_5693c11ab69c4.png'}}
            style={{width: 25, height: 25}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderColor: '#333',
    borderBottomWidth: 2
  },
  actions: {
    flexDirection: 'row'
  }
});

export default NavBar;
