import React from 'react'
import { FlatList, Button, View, Text, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as ProductActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        })
    }

    return <FlatList data={userProducts} keyExtractor={prod => prod.id} renderItem={itemData =>
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => { editProductHandler(itemData.item.id) }} >
            <Button color={Colors.primary} title="Edit" onPress={() =>  { editProductHandler(itemData.item.id) }} />
            <Button color={Colors.primary} title="Delete" onPress={() => { dispatch(ProductActions.deleteProduct(itemData.item.id))}} />
        </ProductItem>
    } />
}

const styles = StyleSheet.create({
})

UserProductsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Your products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navigationData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {
                    navigationData.navigation.navigate({routeName: 'EditProduct'})
                }} />
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen