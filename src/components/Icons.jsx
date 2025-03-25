import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/navigation/1.png');
      break;
    case '2':
      imageSource = require('../assets/navigation/2.png');
      break;
    case '3':
      imageSource = require('../assets/navigation/3.png');
      break;
    case '4':
      imageSource = require('../assets/navigation/4.png');
      break;
    case '5':
      imageSource = require('../assets/navigation/5.png');
      break;
    case 'back':
      imageSource = require('../assets/icons/back.png');
      break;
    case 'arrow':
      imageSource = require('../assets/icons/arrow.png');
      break;
    case 'fav-no':
      imageSource = require('../assets/icons/fav-no.png');
      break;
    case 'fav':
      imageSource = require('../assets/icons/fav.png');
      break;
    case 'clear':
      imageSource = require('../assets/icons/clear.png');
      break;
    case 'delete':
      imageSource = require('../assets/icons/delete.png');
      break;
    case 'edit':
      imageSource = require('../assets/icons/edit.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

});

export default Icons;
