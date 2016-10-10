'use strict'

import React from 'react'
import {
  Text,
  StyleSheet,
  LinkingIOS,
  View
} from 'react-native'

const styles = StyleSheet.create({
  link: {
    color: '#000',
    flexWrap: 'wrap',
    fontWeight: 'bold'
  },
  text: {
    color: '#000'
  },
  container: {
    width: 300
  }
});

const splitHypertext = require('./splitHypertext');

let randomKeyGen = function() { return Math.random().toString(36).substring(7); };

const Hypertext = React.createClass({
  onPress: function(href) {
    if (typeof this.props.onLinkClick === 'function') {
      this.props.onLinkClick.apply(this, arguments);
    } else if (href) {
      LinkingIOS.openURL(href);
    }
  },

  splitHypertext: splitHypertext,

  render: function() {

    const { containerStyle, linkStyle, textStyle } = this.props

    var children = this.splitHypertext({
      input: this.props.children,

      onLink: function(text, href) {
        return <Text style={[styles.link, linkStyle]} key={randomKeyGen()} onPress={
          this.onPress.bind(this, href)
        }>{text}</Text>;
      },

      onText: function(text) {
        return <Text style={[styles.text, textStyle]} key={randomKeyGen()}>{text}</Text>;
      }
    });

    return (
      <View style={[styles.container, containerStyle]}>{children}</View>
    )
  }
});

module.exports = Hypertext;
