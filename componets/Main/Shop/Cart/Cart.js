<<<<<<< HEAD
// import React, { PureComponent } from 'react';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import {fromLeft} from 'react-navigation-transitions'

// import ProductDetail from '../ProductDetail/ProductDetail';
// import CartView from '../Cart/CartView';

// export default class Cart extends PureComponent{
//     render() {
//         const AppNavigator = createStackNavigator({
//             CartView: { screen: CartView, params: this.props },
//             ProductDetail: { screen: ProductDetail },      
//         }, {
//                 initialRouteName: 'CartView',
//                 transitionConfig: () => fromLeft(1000),
//                 headerMode: 'none'
//         });
//         const A = createAppContainer(AppNavigator)

//       return (
//         <A/>
//       );
//     }
//   }

//   const AppNavigator = createStackNavigator({
//         CartView: { screen: CartView, params: this.props },
//         ProductDetail: { screen: ProductDetail },      
//     }, {
//             initialRouteName: 'CartView',
//             transitionConfig: () => fromLeft(1000),
//             headerMode: 'none'
//     });
    // const A = createAppContainer(AppNavigator)
  
   
  



// const StackNavigator = createStackNavigator({
//     // Cart: {
//     //     screen: props=> <CartView  {...props} screenProps = {this.props}/>
//     //  },
//     CartView: { screen: CartView, params: this.props },
//     ProductDetail: { screen: ProductDetail },
    
// }, {
//         initialRouteName: 'CartView',
//         transitionConfig: () => fromLeft(1000),
//         headerMode: 'none'
// });
// export default createAppContainer(StackNavigator)



// export default class Cart extends PureComponent {
//     render() {
//         const StackNavigator = createStackNavigator({
//             CartView: { screen: CartView, params: this.props },
//             ProductDetail: { screen: ProductDetail }
//         }, {
//                 initialRouteName: 'CartView',
//                 transitionConfig: () => fromLeft(1000),
//                 headerMode: 'none'
//         });
//         const Stack = createAppContainer(StackNavigator);
//         return (
//             <Stack />
//         );
//     }
// }

import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'

import iconParty1 from '../../../../media/appIcon/party.jpeg'

import Api from '../../../Api/Api'
import CartsProduct from '../../../Api/CartsProduct';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class Cart extends PureComponent {
    // incrQuantity(id) {
    //     CartsProduct.incrQuantity(id);
    // }
    
    render() {
        const cartArray = this.props.navigation.state.params.cartArray;
        
        // const cartArray = navigation.getParam("screenProps");
         
        const { container, styleDress, styleImage, stylecA3,
            styleNumber, styleA2, body, styleLast } = styles
        return (
            <View style={container}>
                <ScrollView style={body}>
                    {cartArray.map(item => ( 
                        <View key = {item.product.id} style={styleDress}>
                            <Image source={{ uri: `${Api}api/images/product/${item.product.images[0]}` }} style={styleImage} />
                            <View style={styleA2}>
                                <Text style={{ fontSize: 16, color: '#9e9e9e' }}>{toTitleCase(item.product.name)}</Text>
                                <Text style={{ fontSize: 16, color: '#e91e63' }}>{item.product.price}$</Text>
                                <View style={styleNumber}>
                                    <TouchableOpacity >
                                        <Text style={{ fontSize: 25 }} >+</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
                                    <TouchableOpacity >
                                        <Text style={{ fontSize: 25 }}>-</Text>
=======
import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'

import Api from '../../../Api/Api'
import CartsProduct from '../../../Api/CartsProduct'
import sendOrder from '../../../Api/sendOrder'
import getToken from '../../../Api/getToken'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class Cart extends PureComponent {
    incrQuantity(id) {
        CartsProduct.incrquantity(id);
    }

    decrQuantity(id) {
        CartsProduct.decrQuantity(id)
    }

    removeProduct(id) {
        CartsProduct.removeProduct(id);
    }

    navigateDetail(productItem) {
        this.props.navigation.navigate('ProductDetail', { productItem });
    }

     alertSucces() {
          Alert.alert(
            'Confirm',
            'Do you want to send this order?',
            [
                {
                    text: 'Cancel',
                    onPress: () =>  console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                
                { text: 'OK', onPress: this.onSendOrder.bind(this)},         
            ],  
            { cancelable: false },
        );
    }

    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.props.cartArray.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }))
            const kq = await sendOrder(token, arrayDetail);
            console.log(kq)
            
            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG')
            } else {
                console.log('them that bai')
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { cartArray } = this.props
        const { container, styleDress, styleImage, stylecA3,
            styleNumber, styleA2, body, styleLast } = styles
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={container}>
                <ScrollView style={body}>
                    {cartArray.map(cartItem => (
                        <View style={styleDress}>
                            <Image source={{ uri: `${Api}api/images/product/${cartItem.product.images[0]}` }} style={styleImage} />
                            <View style={styleA2}>
                                <Text style={{ fontSize: 16, color: '#9e9e9e' }}>{toTitleCase(cartItem.product.name)}</Text>
                                <Text style={{ fontSize: 17, color: '#e91e63' }}>{cartItem.product.price}$</Text>
                                <View style={styleNumber}>
                                    <TouchableOpacity onPress={() => this.incrQuantity(cartItem.product.id)}>
                                        <Text style={{ fontSize: 20, marginTop: 5 }} >+</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginTop: 5 }}>{cartItem.quantity <= 0 ? 0 : cartItem.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.decrQuantity(cartItem.product.id)}>
                                        <Text style={{ fontSize: 30 }}>-</Text>
>>>>>>> giaodien
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={stylecA3}>
<<<<<<< HEAD
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 17 }}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetail') }}>
=======
                                <TouchableOpacity onPress={() => this.removeProduct(cartItem.product.id)}>
                                    <Text style={{ fontSize: 20 }}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.navigateDetail(cartItem.product)}>
>>>>>>> giaodien
                                    <Text style={{ color: '#f06292' }}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
<<<<<<< HEAD

                </ScrollView>
                
                <TouchableOpacity style={styleLast}>
                    <Text> TOTAL 380$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>

=======
                </ScrollView>
                <TouchableOpacity style={styleLast}
                    onPress={this.alertSucces.bind(this)}
                >
                    <Text> TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
>>>>>>> giaodien
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    styleDress: {
        height: 150,
        backgroundColor: 'white',
        borderRadius: 3,
        flexDirection: 'row',
        padding: 10,
<<<<<<< HEAD
        marginBottom: 15
=======
        marginBottom: 15,
        backgroundColor: 'white',
        margin: 3,
        shadowColor: '#2e272b',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        elevation: 8
>>>>>>> giaodien
    },
    styleImage: {
        height: 120,
        width: 80,
        marginTop: 5
    },
    styleA2: {
        justifyContent: 'space-between',
        marginLeft: 5
    },
    styleNumber: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    stylecA3: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 15
    },
    body: {
        height: 100,
        backgroundColor: '#eeeeee',
        marginTop: 9,
        marginRight: 9,
        marginLeft: 9,
    },
    styleLast: {
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 10
    }
})

<<<<<<< HEAD

{/* <View style = {styleDress}>
                    <Image source={iconParty1} style={styleImage}/>
                    <View style={styleA2}>
                        <Text style = {{fontSize: 20,color:'#9e9e9e'}}>Lace Sleeve Si</Text>
                        <Text style = {{fontSize: 20,color:'#e91e63'}}>227$</Text>
                        <View style = {styleNumber}>
                        <TouchableOpacity onPress = {()=>{this.setState({value: this.state.value +1})}}>
                            <Text style={{fontSize:25}} >+</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:20}}>{this.state.value}</Text>
                        <TouchableOpacity onPress = {()=>{this.setState({value: this.state.value -1 < 0? 0:this.state.value -1 })}}>
                            <Text style={{fontSize:25}}>-</Text>
                        </TouchableOpacity>    
                        </View>                                        
                    </View>
                    <View style={stylecA3}>
                        <TouchableOpacity>
                            <Text style={{fontSize:17}}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('ProductDetail')}}>
                            <Text style={{color:'#f06292'}}>SHOW DETAILS</Text>
                        </TouchableOpacity>
                    </View>
               </View> */}
=======
>>>>>>> giaodien
