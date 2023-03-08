import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const numColumns = 1;


// const renderItem = ({ item }) => (
//     <View style={styles.item}>
//         <View style={styles.card}>
//             {/* <Text style={styles.cname}></Text>
//             <Text style={styles.title}>Report No</Text>
//             <Text style={styles.status}>{item.reportNo}</Text> */}
//             <Text style={styles.title}>Report No :{item.reportNo}</Text>
//             <Text style={styles.title}>Calim Number :{item.claimNumber}</Text>
//             <Text style={styles.title}>Vehical/Registration Number :{item.registrationNo}</Text>
//             <Text style={styles.title}>Company Name :{item.companyName}</Text>
//             <Text style={styles.link}>Full Details...</Text>
//         </View>
//     </View>
// );

const Item = ({ item, navigateToScreen }) => {
    console.log('item', item);
    let id = item.id;
    return (
        <View style={styles.item}>
            <View style={styles.card}>
                <Text style={styles.title}>Report No :{item.reportNo}</Text>
                <Text style={styles.title}>Calim Number :{item.claimNumber}</Text>
                <Text style={styles.title}>Vehical/Registration Number :{item.registrationNo}</Text>
                <Text style={styles.title}>Company Name :{item.companyName}</Text>
                <TouchableOpacity onPress={() => navigateToScreen('Claimdetails', { id })}>
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
    console.log('claimsData Card', claimsData);
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
        backgroundColor: '#215190',
        borderRadius: 8,
        margin: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        padding: 3,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'normal'
    },
    link: {
        color: '#000',
        marginLeft: '73%',
    },
});

export default ClaimsCardComponent;