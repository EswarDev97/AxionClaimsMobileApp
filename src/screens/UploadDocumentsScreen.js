import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import DocumentComponent from '../components/DocumentComponent';
import LogoutButton from '../components/LogoutButton';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const UploadDocumentsScreen = ({ route }) => {
    const { data } = route.params;

    const [refreshing, setRefreshing] = useState(false);
    const [docsInfo, setDocsInfo] = useState({});
    const [estimateInfo, setEstimaeDocsInfo] = useState({});
    const [dlInfo, setDlInfo] = useState({});
    const [rcInfo, setRcInfo] = useState({});
    const [claimforminfo, setClaimforminfo] = useState({});
    const [policyInfo, setPolicyInfo] = useState({});
    const [permitInfo, setPermitInfo] = useState({});
    const [fitnessFCInfo, setFitnessFCInfo] = useState({});
    const [satisfactionInfo, setSatisfactionInfo] = useState({});
    const [pancardInfo, setPancardInfo] = useState({});
    const [adhaarcardInfo, setAdhaarcardInfo] = useState({});
    const [bankInfo, setBankInfo] = useState({});
    const [repairInvoicesInfo, setRepairInvoicesInfo] = useState({});
    const [permitAuthorizationInfo, setPermitAuthorizationInfo] = useState({});
    const [insuredInfo, setInsuredInfo] = useState({});

    const fetchData = async () => {
        let uuid = data.uuid;
        const result = await axios
            .post(`${BASE_URL}/get-assements-documents-data`, {
                uuid
            });
        AsyncStorage.setItem('GetDocumentsInfo', JSON.stringify(result.data));
        setDocsInfo(result.data.data);

        // console.log('Docs result', result.data.data);
        setEstimaeDocsInfo(result.data.data.filter(file => file.type == 'Estimate'))
        setDlInfo(result.data.data.filter(file => file.type == 'DL'))
        setRcInfo(result.data.data.filter(file => file.type == 'RC'))
        setClaimforminfo(result.data.data.filter(file => file.type == 'Claim Form'))
        setPolicyInfo(result.data.data.filter(file => file.type == 'Policy'))
        setPermitInfo(result.data.data.filter(file => file.type == 'Permit'))
        setFitnessFCInfo(result.data.data.filter(file => file.type == 'Fitness FC'))
        setRepairInvoicesInfo(result.data.data.filter(file => file.type == 'Repair Invoices'))
        setSatisfactionInfo(result.data.data.filter(file => file.type == 'Satisfaction Voucher'))
        setPancardInfo(result.data.data.filter(file => file.type == 'Pan Card'))
        setAdhaarcardInfo(result.data.data.filter(file => file.type == 'Adhaar Card'))
        setBankInfo(result.data.data.filter(file => file.type == 'Cancelled Cheque Or Bank Details'))
        setPermitAuthorizationInfo(result.data.data.filter(file => file.type == 'Permit Authorization'))
        setInsuredInfo(result.data.data.filter(file => file.type == 'insured_payment_proof'))
    };

    useEffect(() => {
        fetchData();
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchData()
        // perform any necessary data fetching or refreshing operations
        setRefreshing(false);
    };

    return (
        <React.Fragment>
            <ImageBackground source={backgroundImage} style={styles.background}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >

                    <View style={styles.container}>
                        <Text style={styles.title}>Upload Documents</Text>
                        <DocumentComponent title='Estimate' refresh={fetchData} data={Object.keys(estimateInfo).length != 0 ?
                            estimateInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Estimate"}]} />
                        <DocumentComponent title='Driving License' refresh={fetchData} data={Object.keys(dlInfo).length != 0 ?
                            dlInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "DL"}]} />
                        <DocumentComponent title='Policy' refresh={fetchData} data={Object.keys(policyInfo).length != 0 ?
                            policyInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Policy"}]} />
                        <DocumentComponent title='RC' refresh={fetchData} data={Object.keys(rcInfo).length != 0 ?
                            rcInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "RC"}]} />
                        <DocumentComponent title='Claim Form' refresh={fetchData} data={Object.keys(claimforminfo).length != 0 ?
                            rcInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Claim Form"}]} />
                        <DocumentComponent title='Permit' refresh={fetchData} data={Object.keys(permitInfo).length != 0 ?
                            permitInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Permit"}]} />
                        <DocumentComponent title='Fitness FC' refresh={fetchData} data={Object.keys(fitnessFCInfo).length != 0 ?
                            fitnessFCInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Fitness FC"}]} />
                        <DocumentComponent title='Permit Authorization' refresh={fetchData} data={Object.keys(permitAuthorizationInfo).length != 0 ?
                            permitAuthorizationInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Permit Authorization"}]} />
                        <DocumentComponent title='Satisfaction Voucher' refresh={fetchData} data={Object.keys(satisfactionInfo).length != 0 ?
                            satisfactionInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Satisfaction Voucher"}]} />
                        <DocumentComponent title='Pan Card' refresh={fetchData} data={Object.keys(pancardInfo).length != 0 ?
                            pancardInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Pan Card"}]} />
                        <DocumentComponent title='Adhaar Card' refresh={fetchData} data={Object.keys(adhaarcardInfo).length != 0 ?
                            adhaarcardInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Adhaar Card"}]} />
                        <DocumentComponent title='Cancelled Cheque Or Bank Details' refresh={fetchData} data={Object.keys(bankInfo).length != 0 ?
                            bankInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Cancelled Cheque Or Bank Details"}]} />
                        <DocumentComponent title='Repair Invoices' refresh={fetchData} data={Object.keys(repairInvoicesInfo).length != 0 ?
                            repairInvoicesInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "Repair Invoices"}]} />
                        <DocumentComponent title='Proof of payment by insured' refresh={fetchData} data={Object.keys(insuredInfo).length != 0 ?
                            insuredInfo : [{referenceNo: data.reportNo, file_name: null, claimsurveyUuid: data.uuid, type: "insured_payment_proof"}]} />
                    </View>
                </ScrollView>
                <LogoutButton />
            </ImageBackground>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        bottom: 0,
        top: 0,
        flex: 1,
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '20%',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: '10%',
    },
});

export default UploadDocumentsScreen;