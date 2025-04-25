import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../appAssets/navigation/1.png');
      break;
    case '2':
      imageSource = require('../appAssets/navigation/2.png');
      break;
    case '3':
      imageSource = require('../appAssets/navigation/3.png');
      break;
    case '4':
      imageSource = require('../appAssets/navigation/4.png');
      break;
    case '5':
      imageSource = require('../appAssets/navigation/5.png');
      break;
    case 'back':
      imageSource = require('../appAssets/icons/back.png');
      break;
    case 'arrow':
      imageSource = require('../appAssets/icons/arrow.png');
      break;
    case 'fav-no':
      imageSource = require('../appAssets/icons/fav-no.png');
      break;
    case 'fav':
      imageSource = require('../appAssets/icons/fav.png');
      break;
    case 'clear':
      imageSource = require('../appAssets/icons/clear.png');
      break;
    case 'delete':
      imageSource = require('../appAssets/icons/delete.png');
      break;
    case 'edit':
      imageSource = require('../appAssets/icons/edit.png');
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
