import React from 'react'
import { View, Text, StyleSheet, FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../components/UI/Card'
import CartItem from '../../components/shop/CartItem'
import Colors from '../../constants/Colors'
import * as CartActions from '../../store/actions/cart'
import * as OrderActions from '../../store/actions/orders'

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100)/100}</Text></Text>
                <Button color={Colors.accent} title='Order now' onPress={() => {
                    dispatch(OrderActions.addOrder(cartItems, cartTotalAmount))
                 }} disabled={cartItems.length === 0} />
            </Card>
            <FlatList
                data={cartItems} keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        deletable
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => { dispatch(CartActions.removeFromCart(itemData.item.productId)) }}
                    />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 19
    },
    amount: {
        color: Colors.primary
    }
})

CartScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your cart'
    }
}


export default CartScreen