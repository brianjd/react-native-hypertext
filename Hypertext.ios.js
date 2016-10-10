'use strict'

import React from 'react'
import {
  Text,
  StyleSheet,
  LinkingIOS
} from 'react-native'

const styles = StyleSheet.create({
  link: {
    color: '#fff',
    flexWrap: 'wrap',
    fontWeight: 'bold'
  },
  text: {
    color: '#fff'
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
    var children = this.splitHypertext({
      input: this.props.children,

      onLink: function(text, href) {
        return <Text style={styles.link} key={randomKeyGen()} onPress={
          this.onPress.bind(this, href)
        }>{text}</Text>;
      },

      onText: function(text) {
        return <Text style={styles.text} key={randomKeyGen()}>{text}</Text>;
      }
    });

    return (
      <Text>{children}</Text>
    )
  }
});

module.exports = Hypertext;
