import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, ToastAndroid, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React,{ useState, Component, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './Style/styles';

function Main({ navigation }){


    React.useLayoutEffect(() => {
      navigation.setOptions({headerShown: false});
    }, [navigation]);

    const [selected, setSelected] = React.useState(["-"]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [userData, setUserData] = useState([]);
    const newId = userData.length > 0 ? Math.max(...userData.map((item) => item.id)) + 1 : 1;

    useEffect(() => {
      loadData();
    }, []);


    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData !== null) {
          setUserData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    const saveData = async (newData) => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(newData));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    const addStudent = () => {
      if (fname && lname && username && password) {
        const newData = { newId, fname, lname, selected, username, password };
        const updatedStudents = [...userData, newData];
        setUserData(updatedStudents);
        saveData(updatedStudents);

        ToastAndroid.show('Data Saved Successfully!', ToastAndroid.SHORT);
        setFname('');
        setLname('');
        setSelected('-');
        setUsername('');
        setPassword('');
      } else {
        ToastAndroid.show('Input all Fields!', ToastAndroid.SHORT);
      }
    };

  const list = [
    {key:'1', value:'BSIT'},
    {key:'2', value:'BSCS'},
    {key:'3', value:'BSCRIM'},
    {key:'4', value:'BSELEC'},
    {key:'5', value:'BSELEX'},
    {key:'6', value:'BSIT-FPSM'},
  ]


  return(
    <View style={styles.container}>

        <LinearGradient
        colors={['#F3904F', '#F3504F', '#3B4371', 'transparent']}
        style={styles.background}
        />
        <Image
        style={{ width:  '100%', height: '100%', position: 'absolute' }}
        blurRadius={5}
        source={require('./assets/pattern.png')}
        />
        <Image
          style={{ width: 240, height: 200, position: 'absolute', bottom: 0, right: 0 }}
          source={require('./assets/cat.png')}
          />
        <Image
          style={{ width: 350, height: 120 }}
          source={require('./assets/txtv2.png')}
        />

        <View style={styles.cont}>

          <TextInput
          style={styles.inBorder}
          placeholder="Firstname"
          placeholderTextColor="#fff9" 
          onChangeText={(text) => setFname(text)}
          value={fname}
          />

          <TextInput
          style={styles.inBorder}
          placeholder="Lastname"
          placeholderTextColor="#fff9" 
          onChangeText={(text) => setLname(text)}
          value={lname}
          />

          <SelectList 
          boxStyles={{backgroundColor: '#F3504F', width: 240, borderColor: 'purple', color: 'white'}}
          placeholder='Select Course'
          dropdownStyles={{backgroundColor: 'white', height: 130}}
          setSelected={(val)=> setSelected(val)} 
          data={list} 
          save="value"
          />
        </View>

        <View style={styles.cont}>
          <TextInput
          style={styles.inBorder}
          placeholder="Username"
          placeholderTextColor="#fff9" 
          onChangeText={(text) => setUsername(text)}
          value={username}
          />

          <TextInput
          style={styles.inBorder}
          placeholder="Password"
          placeholderTextColor="#fff9" 
          onChangeText={(text) => setPassword(text)}
          value={password}
          />
        </View>

        <View style={styles.cont}>
          <Button icon="plus" mode="contained" buttonColor='#F3504F' onPress={addStudent} >
            ADD STUDENT
          </Button>

          <Button icon="eye" mode="contained" buttonColor='#F3504F' onPress={()=> navigation.navigate('List', { passedData: userData })}>
            STUDENTS LIST
          </Button>

        </View>

        <StatusBar style="auto" />
      </View>
  );
}

function List({ navigation, route }){

  const { passedData } =route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const tableData = passedData.map((student, index) => [index + 1,`${student.lname}, ${student.fname}`, student.selected, student.username]);
  const [selectedRow, setSelectedRow] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const renderStudentTable = (index) => {
    const tableHead = ['#', 'Name', 'Course', 'Username'];
  
  const handleRowPress = (index) => {
      // Update the selected row when a row is pressed
    setSelectedRow(index);
    modal();
  };
    const modal = () =>{
          setModalVisible(true);

    }
    return (
      <Table borderStyle={{ borderWidth: 2, borderColor: '#F3504F' }}>
        <Row data={tableHead} style={{ height: 40, backgroundColor: '#F3504F', width: 330 }} textStyle={{color: 'white'}} />

            {tableData.map((rowData, index) => (
              <TouchableOpacity key={index} onPress={() => handleRowPress(index)}>
                  <Row 
                  key={index} 
                  data={rowData}
                  borderStyle={{borderWidth: 1, borderColor: '#FF8F8F' }}
                  textStyle={{color: 'black'}} 
                  style={{backgroundColor: 'white', borderColor: 'black' }} 
                  />
              </TouchableOpacity>
            ))}

      </Table>
    );
  };

  return(
    <View style={styles.containerList}>

      <LinearGradient
      colors={['#F3904F', '#F3504F', '#3B4371', 'transparent']}
      style={styles.backgroundList}
      />

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container1List}>
          <View style={styles.modalViewList}>
            <Text style={[styles.modalTextList, {marginBottom: 20}]}>STUDENTS INFORMATION</Text>       
            {selectedRow !== null && (
              <Text style={styles.modalText1List}>{passedData[selectedRow].fname}</Text>
            )}        
            <Text style={[styles.modalText2, {marginBottom: 20}]}>First Name</Text>
            {selectedRow !== null && (
              <Text style={styles.modalText1List}>{passedData[selectedRow].lname}</Text>
            )}
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Last Name</Text>
            {selectedRow !== null && (
              <Text style={styles.modalText1List}>{passedData[selectedRow].selected}</Text>
            )}
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Course</Text>
            {selectedRow !== null && (
              <Text style={styles.modalText1List}>{passedData[selectedRow].username}</Text>
            )}
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Username</Text>
            {selectedRow !== null && (
              <Text style={styles.modalText1List}>{passedData[selectedRow].password}</Text>
            )}
            <Text style={[styles.modalText2, {marginBottom: 20}]}>Password</Text>
            <Button mode="contained" buttonColor='#F3504F' onPress={() => setModalVisible(!modalVisible)}>
            Close
            </Button>
          </View>
        </View>
      </Modal>
      

      <Image
      style={{ width: 240, height: 200, position: 'absolute', bottom: 0, right: 0}}
      blurRadius={0}
      source={require('./assets/cat2.png')}
      />

      <Image
      style={{ width:  '100%', height: '100%', position: 'absolute' }}
      blurRadius={5}
      source={require('./assets/pattern.png')}
      />

      <Image
      style={{ width: 380, height: 140 }}
      source={require('./assets/txt2v2.png')}
      />
        <View>
          {renderStudentTable()}
        </View>

      <Button icon="plus" mode="contained" buttonColor='#F3504F' onPress={() => navigation.goBack()}>
      ADD STUDENT
      </Button>

      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Home" component={Main} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}