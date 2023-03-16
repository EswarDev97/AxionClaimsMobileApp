import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const numColumns = 1;

const Item = ({ item, navigateToScreen }) => {

    let Uuid = item.claimsurveyUuid;
    let Rno = item.reportNo;
    let id = item.id;
    return (
        <View style={styles.item}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Report No:</Text>
                    <Text style={styles.title}>{item.reportNo}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Calim Number:</Text>
                    <Text style={styles.title}>{item.claimNumber}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Vehical/Registration Number:</Text>
                    <Text style={styles.title}>{item.registrationNo}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Company Name:</Text>
                    <Text style={styles.title}>{item.companyName}</Text>
                </View>
                <TouchableOpacity onPress={() => navigateToScreen('Claimdetails', { Uuid, Rno, id })}>
                    <Text style={styles.link}>Full Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const ClaimsCardComponent = ({ claimsData, navigation }) => {
    const navigateToScreen = (screenName, params) => {
        navigation.navigate(screenName, params);
    };
    // console.log('claimsData Card', claimsData);
    return (
        <React.Fragment>
            <View style={styles.container}>
                <FlatList
                    data={claimsData}
                    // renderItem={renderItem}
                    renderItem={({ item }) => <Item item={item} navigateToScreen={navigateToScreen} />}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                />
            </View>
        </React.Fragment>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        width: '100%',
        borderRadius: 10,
        flex: 1 / numColumns,
        marginTop: 5,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    title: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        width: '60%',
    },
    link: {
        fontSize: 16,
        color: 'blue',
        marginLeft: '70%',
    },
});

export default ClaimsCardComponent;