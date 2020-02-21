import React from 'react'
import { FlatList, Button, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/cart'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
    }

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData =>
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

const style = StyleSheet.create({

})

ProductsOverviewScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navigationData.navigation.navigate({
                        routeName: 'Cart'
                    })
                }} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navigationData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

export default ProductsOverviewScreen;
