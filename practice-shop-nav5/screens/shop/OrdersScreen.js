import React, {useEffect, useState, useCallback} from 'react'
import { View, FlatList, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import * as OrderActions from '../../store/actions/orders'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import Colors from '../../constants/Colors'

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(OrderActions.fetchOrders())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadOrders()
    }, [dispatch, loadOrders])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadOrders)
        return () => {
            unsubscribe()
        }
    }, [loadOrders])

    if (error) {
        return (<View style={styles.centered}>
            <Text>An error ocurred!</Text>
            <Button title="Try again" onPress={loadOrders} color={Colors.primary} />
        </View>)
    }

    if (isLoading) {
        return (<View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>)
    }
    if (!isLoading && orders.length === 0) {
        return (<View style={styles.centered}>
            <Text>No orders found. Add some!</Text>
        </View>)
    }

    return (
        <View style={styles.screen}>
            <FlatList data={orders} keyExtractor={order => order.id} renderItem={itemData => {
                return <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate} 
                    items={itemData.item.items} />
            }} />
        </View>
    )
}

export const screenOptions = navData => {
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen