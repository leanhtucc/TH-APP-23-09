import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TH1 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content1}>
                <View style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>Lê Minh Châu</Text>
                    <Text style={styles.major}>Sinh viên CNTT</Text>
                </View>
            </View>
            <View style={styles.content2}>
                <View style={styles.items}>
                    <Text style={styles.value}>12</Text>
                    <Text style={styles.label}>Mon</Text>
                </View>
                <View style={styles.items}>
                    <Text style={styles.value}>3.6</Text>
                    <Text style={styles.label}>GPA</Text>
                </View>
                <View style={styles.items}>
                    <Text style={styles.value}>120</Text>
                    <Text style={styles.label}>Tin Chi</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 44,
        paddingBottom: 10,
        gap: 12,
    },
    content1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    avatar: {
        width: 60,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#C0392B"
    },
    info: {
        marginLeft: 16
    },
    name: {
        fontSize: 20,
        fontWeight: "bold"
    },
    major: {
        fontSize: 12,
        color: '#888',
        marginTop: 2
    },
    content2: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 8,
    },
    items: {
        alignItems: "center"
    },

    value: {
        fontSize: 20,
        fontWeight: "bold"
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginTop: 2
    }

})

export default TH1