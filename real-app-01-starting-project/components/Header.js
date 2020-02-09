import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = props => {
    return (
        <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndorid }) }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    headerAndorid: {
        backgroundColor: Colors.primary,
    },
    title: {
        color: Platform.OS == 'ios' ? Colors.primary : 'white'
    }
})

export default Header;