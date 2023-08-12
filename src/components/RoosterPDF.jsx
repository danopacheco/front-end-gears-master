import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  mechanicText: {
    fontSize: 14,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '30%',
  },
  timeText: {
    fontSize: 18,
    width: '70%',
  },
});

const RoosterPDF = ({ schedules, selectedMechanic }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Ger Garage Schedule</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mechanic Information</Text>
          <Text style={styles.text}>Mechanic: {selectedMechanic}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          {Object.keys(schedules).map(day => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day}:</Text>
              <Text style={styles.timeText}>
                {schedules[day].startTime || 'Not set'} - {schedules[day].endTime || 'Not set'}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default RoosterPDF;
