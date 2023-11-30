import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, Modal, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React,{ useState } from 'react';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Table, Row, Rows } from 'react-native-table-component';
import TableData from '../src/table';

export default function List({ navigation }) {

  const [modalVisible, setModalVisible] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
      
  return (
    <View style={styles.container}>

      <LinearGradient
      colors={['#F3904F', '#F3504F', '#3B4371', 'transparent']}
      style={styles.background}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container1}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {marginBottom: 20}]}>STUDENTS INFORMATION</Text>
            <Text style={styles.modalText1}>Ira Jane</Text>
            <Text style={[styles.modalText2, {marginBottom: 20}]}>First Name</Text>
            <Text style={styles.modalText1}>Renoblas</Text>
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Last Name</Text>
            <Text style={styles.modalText1}>BSIT</Text>
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Course</Text>
            <Text style={styles.modalText1}>irajane17</Text>
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Username</Text>
            <Text style={styles.modalText1}>03irajane123</Text>
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Password</Text>
            <Button mode="contained" buttonColor='#F3504F' onPress={() => setModalVisible(!modalVisible)}>
            Close
            </Button>
          </View>
        </View>
      </Modal>

      <Image
      style={{ width: 240, height: 200, position: 'absolute', marginTop: 750, marginLeft: 220 }}
      blurRadius={0}
      source={require('../assets/cat2.png')}
      />

      <Image
      style={{ width:  '100%', height: '100%', position: 'absolute' }}
      blurRadius={5}
      source={require('../assets/pattern.png')}
      />

      <Image
      style={{ width: 380, height: 140 }}
      source={require('../assets/txt2v2.png')}
      />
        <View>
            <TableData/>
        </View>

      <Button icon="plus" mode="contained" buttonColor='#F3504F' onPress={() => navigation.goBack()}>
      ADD STUDENT
      </Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001524',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },
  container1: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%'
  },
  head: { height: 40, backgroundColor: '#FF8F8F' },
  modals: {     
    height: 170,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    height:440,
    width: 330,
    backgroundColor: 'white',
    blurRadius: 9,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText1: {
    fontSize: 20,
  },
  modalText2: {
    fontSize: 12,
  }
});