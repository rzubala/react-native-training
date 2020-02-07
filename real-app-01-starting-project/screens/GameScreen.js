import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/BodyText'

import DefaultStyles from '../constants/default-styles'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice).toString()
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice)
            || direction === 'greater' && currentGuess > props.userChoice) {
            Alert.alert("Don\'t lie!", 'You know this is wrong ...',
                [{ text: 'Sorry!', style: 'cancel' }])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = (parseInt(currentGuess) + 1).toString()
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses])
    }

    const renderListItem = (listLength, itemData) => {
        return (
            <View style={styles.listItem}>
                <BodyText>#{listLength - itemData.index}</BodyText>
                <BodyText>{itemData.item}</BodyText>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} ><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list} keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    }
})
export default GameScreen