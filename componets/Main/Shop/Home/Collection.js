import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import bannerImage from '../../../../media/temp/banner.jpg'
const { width } = Dimensions.get('window')

export default class Collection extends PureComponent {

    goToListProduct(category) {
        this.props.navigation.navigate('ListProduct', { category: { name: 'SPRING COLLECTION', id: 4 } })
    }

    render() {
        const { wraper, textStyle, imagestyle } = styles
        return (
            <View style={wraper}>
                <View style={{ flex: 1 }}>
                    <Text style={textStyle}>SPRING COLLECTION</Text>
                </View>
                <TouchableOpacity style={{ flex: 4 }} onPress={this.goToListProduct.bind(this)}>
                    <Image source={bannerImage} style={imagestyle} />
                </TouchableOpacity>
            </View>
        )
    }
}

const imageWidth = width - 40
const imageHeight = imageWidth / 933 * 465
const styles = StyleSheet.create({
    wraper: {
        height: 220,
        backgroundColor: 'white',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        elevation: 8,
        padding: 10
    },
    textStyle: {
        fontSize: 20,
        color: '#9e9e9e'
    },
    imagestyle: {
        height: imageHeight,
        width: imageWidth
    }
})
