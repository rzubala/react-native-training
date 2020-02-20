import React from 'react'
import { FlatList, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/cart'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()
    return <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData =>
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetails={() => {
                props.navigation.navigate({
                    routeName: 'ProductDetail',
                    params: {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    }
                })
            }}
            onAddToCart={() => {
                dispatch(CartActions.addToCart(itemData.item))
            }}
        />
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
        )
    }
}

export default ProductsOverviewScreen;
