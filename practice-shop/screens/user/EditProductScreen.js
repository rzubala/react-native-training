import React, { useEffect, useCallback, useReducer } from 'react'
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import * as ProductActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidaties = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidaties) {
            updatedFormIsValid = updatedFormIsValid && updatedValidaties[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidaties
        }
    }
    return state
}

const EditProductsScreen = props => {
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    })

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'OK' }])
            return
        }
        if (editedProduct) {
            dispatch(ProductActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
        } else {
            dispatch(ProductActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, isValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: isValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input label='Title' id='title'
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText='Please enter a valid title'
                        keyboardType='default' autoCapitalize='sentences' autoCorrect returnKeyType='next'
                        required />
                    <Input label='Image Url' id='imageUrl'
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText='Please enter a valid image Url'
                        keyboardType='default' returnKeyType='next'
                        required />
                    {editedProduct ? null : (
                        <Input label='Price' id='price'
                            errorText='Please enter a valid price'
                            keyboardType='decimal-pad' returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1} />
                    )}
                    <Input label='Description' id='description'
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        errorText='Please enter a valid description'
                        keyboardType='default' autoCapitalize='sentences' autoCorrect multiline numberOflines={3}
                        required
                        minLength={5} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

EditProductsScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit product' : 'Add product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFn} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },

})

export default EditProductsScreen