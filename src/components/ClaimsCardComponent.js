import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ToastAndroid, TextInput } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { AuthContext } from '../context/AuthContext';
import CardComponent from '../components/CardComponent';
import { Center } from 'native-base';

const numColumns = 1;

const Item = React.memo(({ item, navigateToScreen }) => {
  // console.log('item', item);
    const [claimStatus, setClaimStatus] = useState(null);
    const { userInfo } = useContext(AuthContext);
    let role = userInfo.userType[0];
    const [sessionLink, setSessionLink] = useState(null);

    useEffect(() => {
        if (item.status != null) {
          const result = StatusObj.filter(obj => obj.ref == item.status);
          setClaimStatus(result[0].val);
          // console.log(result[0].val);
        }
      }, [item.status])

      const generateLink = (Uuid) => {
        // Replace '83a60a83-303d-11ee-ad23-0ae925d05982+' with your base URL
        let url = `https://cs.axionpcs.in/axion-claimsurvey/customer-survey?id=${Uuid}`;
        setSessionLink(url)
        return `https://cs.axionpcs.in/axion-claimsurvey/customer-survey?id=${Uuid}`;
      };
    
      const handleCopyToClipboard = useCallback(() => {
        console.log('item.Uuid', Item.claimsurveyUuid);
        const linkToCopy = generateLink(Item.claimsurveyUuid);
        Clipboard.setString(linkToCopy);
      }, [Item.claimsurveyUuid, generateLink]);

      const StatusObj = [
        { ref: 0, val: 'Fresh Case' },
        { ref: 8, val: 'Pending Documents' },
        { ref: 100, val: 'Pending Photo Upload' },
        { ref: 101, val: 'Final Survey Completed' },
        { ref: 102, val: 'Awaiting Spare Parts' },
        { ref: 104, val: 'Pending Invoice' },
        { ref: 108, val: 'Ready For Initial Approval' },
        { ref: 105, val: 'Initial Approval Given & Work Order Issued' },
        { ref: 106, val: 'Workshop Not Responding' },
        { ref: 107, val: 'Pending Assessment' },
        { ref: 9, val: 'Cancelled' }
      ];
    let Uuid = Item.claimsurveyUuid;
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
                    <Text style={styles.label}>Registration Number:</Text>
                    <Text style={styles.title}>{item.registrationNo}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.title}>{claimStatus}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Company Name:</Text>
                    <Text style={styles.title}>{item.companyName}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Garage Name:</Text>
                    <Text style={styles.title}>{item.garageUserName}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Garage Mobile:</Text>
                    <Text style={styles.title}>{item.garageUserMobile}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={handleCopyToClipboard} style={styles.button}>
                        <Text style={styles.button}>Copy Link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigateToScreen('Claimdetails', { Uuid, Rno, id })}>
                        <Text style={styles.link} >Full Details &gt;&gt;</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});
  const ClaimsCardComponent = ({ claimsData, navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [claimData, setClaimData] = useState([]);
    const [searchType, setSearchType] = useState('claimNumber');
    const [searchTerm, setSearchTerm] = useState('');

    const numColumns = 1;
    const pageSize = 10;

    const navigateToScreen = (screenName, params) => {
      navigation.navigate(screenName, params);
    };

    const handleLoadMore = () => {
      if (currentPage * pageSize < claimsData.length) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handleSearchTypeChange = (value) => {
      setSearchType(value);
    };

    const handleSearchTermChange = (value) => {
      setSearchTerm(value);
      if (value === '') {
        setClaimData([]);
      }
    };

    const handleSearch = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const searchData = claimsData.filter(item => {
        if (searchType === 'claimNumber') {
          const itemClaimNumber = item.claimNumber ? item.claimNumber.toLowerCase() : '';
          return itemClaimNumber.includes(lowerCaseSearchTerm);
        } else if (searchType === 'registrationNumber') {
          const itemRegistrationNo = item.registrationNo ? item.registrationNo.toLowerCase() : '';
          return itemRegistrationNo.includes(lowerCaseSearchTerm);
        }
        return false;
      });
      setClaimData(searchData);
    };

    const renderItem = ({ item }) => (
      <Item item={item} navigateToScreen={navigateToScreen} />
    );

    const keyExtractor = (item) => item.id.toString();

    // Calculate the paged data
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let pagedClaimsData = claimData.length !== 0 ? claimData.slice(startIndex, endIndex) : claimsData.slice(startIndex, endIndex);

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <TouchableOpacity onPress={() => handleSearchTypeChange('claimNumber')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 15, height: 15, borderRadius: 10, borderColor: '#1688f2', borderWidth: 1, marginRight: 5 }}>
                  {searchType === 'claimNumber' && <View style={{ width: 13, height: 13, borderRadius: 6, backgroundColor: '#1688f2' }} />}
                </View>
                <Text style={{ color: 'white', }}>Claim Number</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSearchTypeChange('registrationNumber')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <View style={{ width: 15, height: 15, borderRadius: 10, borderColor: '#1688f2', borderWidth: 1, marginRight: 5 }}>
                  {searchType === 'registrationNumber' && <View style={{ width: 13, height: 13, borderRadius: 6, backgroundColor: '#1688f2' }} />}
                </View>
                <Text style={{ color: 'white', }}>Registration Number</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
          <TextInput
            style={{
              height: 40,
              backgroundColor: 'white',
              marginBottom: 10,
              paddingLeft: 10,  // Add left padding
              paddingRight: 10,  // Add right padding
              borderWidth: 0,  // Remove border
              borderRadius: 15,  // Optional: Add border radius for rounded corners
            }}
            placeholder="Enter Number"
            value={searchTerm}
            onChangeText={handleSearchTermChange}
          />

            <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
              <Text style={styles.searchBtn}>Search</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={pagedClaimsData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            windowSize={10}  // Adjust this value based on your use case
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
        backgroundColor: '#2557cc',
        padding: 5, // Adjust the padding as needed
        borderRadius: 5, // Adjust the border radius as needed
        alignItems: 'center',
        color: 'white',
        fontSize: 16, // Text size
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust this to control the space between the buttons
    },
    button: {
        backgroundColor: '#3dbedb', // Light green color with 50% opacity
        alignItems: 'center',
        color: 'white', // Text color
        fontSize: 14, // Text size
        padding: 3,
        borderRadius: 5,
    },
    searchBtn: {
      backgroundColor: '#31bdaa',
      alignItems: 'center',
      color: 'white', // Text color
      fontSize: 14, // Text size
      padding: 4,
      borderRadius: 5,
      textAlign: 'center',
    }
});

export default ClaimsCardComponent;