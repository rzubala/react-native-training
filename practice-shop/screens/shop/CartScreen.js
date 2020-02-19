import React from 'react'
import { View, Text, StyleSheet, FlatList, Platform, Button } from 'react-native'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)

    return (
        <View>
            <View>
                <Text>Total: <Text>${19.99}</Text></Text>
                <Button title='Order now' onPress={() => {}}/>
            </View>
            {/* <FlatList /> */}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CartScreen