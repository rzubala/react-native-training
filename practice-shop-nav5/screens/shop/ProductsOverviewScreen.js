import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/cart'
import * as ProductsActions from '../../store/actions/products'

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true)
        setError(null)
        try {
            await dispatch(ProductsActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsRefreshing, setError])

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, [dispatch, loadProducts])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts)
        return () => {
            unsubscribe()
        }
    }, [loadProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
    }

    if (error) {
        return (<View style={styles.centered}>
            <Text>An error ocurred!</Text>
            <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
        </View>)
    }

    if (isLoading) {
        return (<View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>)
    }
    if (!isLoading && products.length === 0) {
        return (<View style={styles.centered}>
            <Text>No products found. Add some!</Text>
        </View>)
    }

    return <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products} keyExtractor={item => item.id} renderItem={itemData =>
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)} >
            <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
            <Button color={Colors.primary} title="Add to cart" onPress={() => dispatch(CartActions.addToCart(itemData.item))} />
        </ProductItem>
    } />
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const screenOptions = navigationData => {
    return {
        headerTitle: 'All products',
        headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navigationData.navigation.navigate({
                        routeName: 'Cart'
                    })
                }} />
            </HeaderButtons>
        ),
        headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navigationData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

export default ProductsOverviewScreen;
