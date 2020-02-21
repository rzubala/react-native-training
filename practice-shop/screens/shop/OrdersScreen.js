import React from 'react'
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)

    return (
        <View style={styles.screen}>
            <FlatList data={orders} keyExtractor={order => order.id} renderItem={itemData => {
                return <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate} />
            }} />
        </View>
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

})

export default OrdersScreen