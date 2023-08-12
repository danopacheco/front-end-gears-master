import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';
import { GiConsoleController } from 'react-icons/gi';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    margin: "5px",
    padding: "5px",
  },
  tableHeader: {
    borderBottomWidth: 1,
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    margin: 'auto',
    fontSize: 12,
    padding: 5,
    // textAlign: 'center',
  },
});

const InvoicePDF = ({ serviceDetails, partDetails, extraInfoData }) => {



  const totalAmountService = serviceDetails.reduce((total, service) => total + parseFloat(service.total), 0);
  const totalAmountParts = partDetails.reduce((total, service) => total + parseFloat(service.total), 0);
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>INVOICE</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GEAR'S</Text>
          <Text>87 woodlfire firehouse</Text>
          <Text>Dublin, D22 T5PO</Text>
          <Text>+353 081 256389</Text>
          <Text>daniel@gears.com</Text>
          <Text>Invoice Number: {extraInfoData.invoiceNumber}</Text>
          <Text>Client Name: {extraInfoData.clientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell]}>SERVICE DESCRIPTION</Text>
              <Text style={[styles.tableCell]}>NOTE</Text>
              <Text style={[styles.tableCell]}>AMOUNT</Text>
              <Text style={[styles.tableCell]}>TOTAL</Text>
            </View>
            {serviceDetails.map((service, index) => (
              <>
              <View key={index}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell]}>{service.serviceDescription}</Text>
                  <Text style={[styles.tableCell]}>{service.note}</Text>
                  <Text style={[styles.tableCell]}>${service.amount}.00</Text>
                  <Text style={[styles.tableCell]}>${service?.total}.00</Text>
                </View>
              </View>
              </>
            ))}
              <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell]}>TOTAL SERVICE</Text>
              <Text style={[styles.tableCell]}>${totalAmountService}.00</Text>
              </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PARTS DESCRIPTION</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell]}>PART NAME</Text>
              <Text style={[styles.tableCell]}>QUANTITY</Text>
              <Text style={[styles.tableCell]}>UNIT AMOUNT </Text>
              <Text style={[styles.tableCell]}>TOTAL</Text>
            </View>
            {partDetails?.map((e, index) => (
              <>
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell]}>{e?.partDescription}</Text>
                  <Text style={[styles.tableCell]}>{e?.quantity}</Text>
                  <Text style={[styles.tableCell]}>${e?.unitAmount}.00</Text>
                  <Text style={[styles.tableCell]}>${e?.total}.00</Text>
                </View>
              </>
            ))}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell]}>TOTAL PARTS</Text>
                  <Text style={[styles.tableCell]}>${totalAmountParts}.00</Text>
                </View>
          </View>
        </View>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell]}>TOTAL SERVICE</Text>
          <Text style={[styles.tableCell]}>${totalAmountService}.00</Text>
        </View>

        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell]}>TOTAL PARTS</Text>
          <Text style={[styles.tableCell]}>${totalAmountParts}.00</Text>
        </View>

        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell]}>TAX</Text>
          <Text style={[styles.tableCell]}>0.00%</Text>
        </View>

        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell]}>TOTAL PARTS</Text>
          <Text style={[styles.tableCell]}>${totalAmountService + totalAmountParts}.00</Text>
        </View>


      </Page>
    </Document>
  );
};

export default InvoicePDF;
