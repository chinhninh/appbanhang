import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native'

import CartsProduct from '../../../Api/CartsProduct'
import Api from '../../../Api/Api'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class SearchView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: []
        }
        CartsProduct.setSearchArray = this.setSearchArray.bind(this)
    }

    setSearchArray(arrPoduct) {
        this.setState({ listProduct: arrPoduct })
    }

    goToDetail(productItem) {
        this.props.navigation.navigate('ProductDetail', { productItem });
    }


    render() {
        const { container, styleBody, styleParty, styleNameSp1, styleMoney
            , materialStyle, styleTouopcity, styleTextColor, colorStyle, styleShow, informationStyle } = styles
        return (
            <View style={container}>
                <FlatList
                    data={this.state.listProduct}
                    renderItem={({ item }) => (
                        <View style={styleBody}>
                            <Image source={{ uri: `${Api}api/images/product/${item.images[0]}` }} style={styleParty} />
                            <View style={informationStyle}>
                                <Text style={styleNameSp1}>{toTitleCase(item.name)}</Text>
                                <Text style={styleMoney}>{item.price}$</Text>
                                <Text style={materialStyle}>Material {item.material}</Text>
                                <View style={styleTouopcity}>
                                    <Text style={styleTextColor}>Color {item.color}</Text>
                                    <View style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 10,
                                        backgroundColor: item.color.toLowerCase(),
                                        marginRight: 5,
                                        marginLeft: 5
                                    }} />
                                    <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                        <Text style={styleShow}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    styleBody: {
        height: 145,
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: '#2e272b',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        elevation: 8
    },
    styleParty: {
        width: 80,
        height: 120,
        marginTop: 10
    },
    informationStyle: {
        justifyContent: 'space-between'
    },
    styleNameSp1: {
        fontSize: 25,
        color: '#efebe9'
    },
    styleMoney: {
        color: '#ec407a'
    },
    materialStyle: {
        fontSize: 15
    },
    styleTouopcity: {
        height: 45,
        flexDirection: 'row',
    },
    styleTextColor: {
        fontSize: 15
    },
    colorStyle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'gainsboro',
        marginRight: 5,
        marginLeft: 5
    },
    styleShow: {
        fontSize: 12,
        color: '#ec407a'
    },
    informationStyle: {
        justifyContent: 'space-between'
    }
})
