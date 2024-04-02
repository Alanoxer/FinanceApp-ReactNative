import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, Modal,ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icons} from "../../src/components/useIcons";

import AddButton from "../../assets/add-circle-svgrepo-com.svg"
import CloseButton from "../../assets/close-ellipse-svgrepo-com.svg"

import WorkIcon from '../../assets/briefcase-svgrepo-com.svg'
import HouseIcon from "../../assets/house-svgrepo-com.svg"
import SellIcon from "../../assets/sold-svgrepo-com.svg"

export default function Ingresos(){
    const [inputValue, setInputValue] = useState(""); 
    const [icon, setIcon] = useState("")
    const [incomes, setIncomes] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null)

    const storeData = async (value) => {
        try {
            const currentSavedItems = await AsyncStorage.getItem('incomes')

        if(currentSavedItems !== null){
            const currentSavedItemsParsed = JSON.parse(currentSavedItems);
            currentSavedItemsParsed.splice(0,0,value)
            
            await AsyncStorage.setItem('incomes', JSON.stringify(currentSavedItemsParsed));
            setIncomes(currentSavedItemsParsed)
        }
            
        } catch (e) {
          alert(e)
        }
      };

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('incomes');
          if(jsonValue !== null){
            const values = JSON.parse(jsonValue)
            setIncomes(values)

          }
        } catch (e) {
          alert(e)
        }
      };
    
      useEffect(()=>{
        getData()
      },[incomes])
  
    const handleChange = (text) => { 
        const numericValue = text.replace(/[^0-9]/g, ""); 
        setInputValue(numericValue); 
    }; 

    return(
        <View style={styles.container}>
          { incomes !== undefined ?
            <FlatList 
                data={incomes}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Text> </Text>}
                renderItem={({item}) => (<Icons icon={item.icon} value={item.value} date={item.date}/>)}
            />
            : <ActivityIndicator style={{position:"relative", left:160,top:240,marginBottom:601,}} size={"large"}/> }
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
        >
            
        <View style={styles.containerAddSection}>
            <View style={styles.closeButton}>
                <Pressable onPress={()=>{setModalVisible(!modalVisible)}}>
                    <CloseButton width={40} height={40}/>
                </Pressable> 
            </View>

            { error === "" || error !== null ?
            <View style={styles.error}>
                <Text style={{color:"white", textAlign:"center"}}>
                    Error: {error}
                </Text>
            </View>
            : null
        }

            <View style={styles.InputBox}>
            <Text style={styles.title}>income value</Text> 
            <TextInput 
                style={styles.input} 
                onChangeText={handleChange} 
                value={inputValue} 
                keyboardType="numeric"
                placeholder="Enter numbers only"
                placeholderTextColor="#999"
            /> 
            </View>

            <View style={styles.sectionIcons}>

            <View style={styles.sectionIcons}>

                <Pressable onPress={()=>{setIcon("Work")}} style={({pressed}) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : null,
                        },
                        styles.icon,
                      ]}>
                    <WorkIcon width={50} height={50}/>
                    <Text style={styles.iconText}>Work</Text>
                </Pressable>

                <Pressable onPress={()=>{setIcon("Rent")}}  style={({pressed}) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : null,
                        },
                        styles.icon,
                      ]}>
                    <HouseIcon width={50} height={50}/>
                    <Text style={styles.iconText} >Rent</Text>
                </Pressable>

                <Pressable onPress={()=>{setIcon("Sell")}} 
                style={({pressed}) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : null,
                        },
                        styles.icon,
                      ]}>
                    <SellIcon width={50} height={50}/>
                    <Text style={styles.iconText}>Sell</Text>
                </Pressable>
                
            </View>

            </View>

            <View style={styles.addSectionButton}>
            <Pressable onPress={()=>{
                const data = {
                    value: inputValue,
                    icon: icon, 
                    date: new Date()
                }
                if(data.value === "" || data.icon === ""){
                  setError("expense value and icon can't be null")
                }else{
                storeData(data)
                setModalVisible(!modalVisible)
                setInputValue("")
                setError(null)
                }
            }}>
                <AddButton width={60} height={60}/>
            </Pressable>
            </View>          
        </View>
        
        </Modal>

        <View style={styles.addSectionButton}>
            <Pressable onPress={()=>{setModalVisible(!modalVisible)}}>
                <AddButton width={60} height={60}/>
            </Pressable>
        </View>
        </View>    

        </View>
    )
 }

const styles = StyleSheet.create({
    //Ingresos
    container: {
      flex: 1,
      backgroundColor: "#f9f8ce",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingLeft:30,
      paddingTop:30,
      paddingBottom:30,
    },

    addSectionButton:{
        backgroundColor:"#45aab8",
        borderRadius:200,
        height:60, 
        position:"absolute",
        left:150,
        bottom:-34,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        alignContent:"center"
        
    },
    // Ingresos

    

    //AddSection
    containerAddSection:{
      flex: 1,
      backgroundColor: "#fbf158",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginHorizontal:20,
      marginVertical:80,
      borderRadius:30,
      borderWidth:2,
    },
    sectionIcons:{
        flexDirection:"row",
        gap:50,
        marginTop:30,
        marginLeft:25,
    },
    icon:{
        textAlign:"center",
        borderRadius:10,
    },
    iconText:{
        textAlign:"center"
    },
    closeButton:{
      position:"absolute",
      right:10,
      top:10,
      backgroundColor:"#fd5651",
      borderRadius:200,
      height:40, 
    },
    // AddSection end

    //Numeric Input
    InputBox:{
        marginLeft:40,
        marginTop:20,
    },
    title: { 
        fontSize: 24, 
        marginBottom: 20, 
        color: "green", 
        fontWeight: "bold", 
    }, 
    input: { 
        width: 250, 
        height: 50, 
        borderWidth: 2, 
        borderColor: "green", 
        borderRadius: 10, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        fontSize: 18, 
        color: "#333", 
        backgroundColor: "#fff", 
    }, 
    //Numeric Input end

    //error
    error:{
      position:"relative",
      left:15,
      top:10,
      padding:10,
      backgroundColor:"#e81e30",
      borderRadius:100,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
  }
  });
  






    