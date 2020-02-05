import React from 'react'
import { View, StyleSheet, Button, Image } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
    return (<View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
            <Image style={styles.image} 
            fadeDuration={1000}
            //source={require('../assets/success.png')} 
            source={{uri: 'https://klasresearch.com/resources/images/default-source/default-album/population-health-summit.jpg'}} 
            resizeMode='cover' />
        </View>
        <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
        <BodyText>Number was: {props.userNumber}</BodyText>
        <Button title="New game" onPress={props.onRestart} />
    </View>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    image: {
        width: '100%',
        height: '100%'        
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    }
})

export default GameOverScreen