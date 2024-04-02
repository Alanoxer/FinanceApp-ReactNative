import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, Modal, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icons, IconsTernal} from "../../src/components/useIcons";
import SelectDropdown from 'react-native-select-dropdown'

import AddButton from "../../assets/add-circle-svgrepo-com.svg"
import CloseButton from "../../assets/close-ellipse-svgrepo-com.svg"

const icons = [
    {iconn:"Deport"},
    {iconn:"Alcohol"},
    {iconn:"Books"},
    {iconn:"RentHouse"},
    {iconn:"Bus"},
    {iconn:"Car"},
    {iconn:"CreditCard"},
    {iconn:"Technology"},
    {iconn:"Bills"},
    {iconn:"Fun"},
    {iconn:"Health"},
    {iconn:"Gift"},
    {iconn:"Shopping"},
    {iconn:"Clothes"},
    {iconn:"Education"},
]

const months = [
    {title:"this month"},
    {title:"past month"},
    {title:"two months ago"},
    {title:"three months ago"},
    {title:"for months ago"},
    {title:"five months ago"},
    {title:"all"}
  ]

export default function Gastos(){
    const [inputValue, setInputValue] = useState(""); 
    const [icon, setIcon] = useState("")
    const [expenses, setExpenses] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null)
    const [time, setTime] = useState(new Date().getMonth())

    const times = (month)=>{
        month === "this month" ? setTime(new Date().getMonth()) : null ||
        month === "past month" ? setTime(new Date().getMonth()-1) : null ||
        month === "two months ago" ? setTime(new Date().getMonth()-2) : null ||
        month === "three months ago" ? setTime(new Date().getMonth()-3) : null ||
        month === "for months ago" ? setTime(new Date().getMonth()-4) : null ||
        month === "five months ago" ? setTime(new Date().getMonth()-5) : null ||
        month === "all" ? setTime("all") : null
      }

    const storeData = async (value) => {
        try {
            const currentSavedItems = await AsyncStorage.getItem('expenses')

        if(currentSavedItems !== null){
            const currentSavedItemsParsed = JSON.parse(currentSavedItems);
            currentSavedItemsParsed.splice(0,0,value)
            
            await AsyncStorage.setItem(
                'expenses',
                 JSON.stringify(currentSavedItemsParsed));

            setExpenses(currentSavedItemsParsed)
        }
        } catch (e) {
          alert(e)
        }
      };

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('expenses');
          if(jsonValue !== null){
            const values = JSON.parse(jsonValue)
            const filters = values.filter((el)=> new Date(el.date).getMonth() == time)
            const expenses = time === "all" ? values : filters
            setExpenses(expenses)
          }
        } catch (e) {
          alert(e)
        }
      };
      
      useEffect(()=>{
        getData()
      },[time, expenses])
  
    const handleChange = (text) => { 
        const numericValue = text.replace(/[^0-9]/g, ""); 
        setInputValue(numericValue); 
    }; 

    return(
        <View style={styles.container}>

<SelectDropdown
    data={months}
    onSelect={(selectedItem) => {
      times(selectedItem.title)
      console.log(selectedItem.title);
    }}
    renderButton={(selectedItem) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Select the month'}
          </Text>
        </View>
      );
    }}
    renderItem={(item, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
           { expenses !== undefined && expenses != [ ] ?
            <FlatList 
                data={expenses}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Text> </Text>}
                renderItem={({item}) => (<Icons icon={item.icon} value={item.value} date={item.date}/>)}
            />
           : <ActivityIndicator style={{position:"relative", left:160,top:240,marginBottom:575,}} size={"large"}/> }
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
        >
            
        <View style={styles.containerAddSection}>
            <View style={styles.closeButton}>
                <Pressable onPress={()=>{setModalVisible(!modalVisible) + setError("")}}>
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
            <Text style={styles.title}>expense value</Text> 
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

            <FlatList 
                columnWrapperStyle={styles.wrapperIcons}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={icons}
                ItemSeparatorComponent={() => <Text> </Text>}
                renderItem={({item}) => (
                    <Pressable onPress={()=>{setIcon(item.iconn)}} 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : null,
                        },
                        styles.icon,
                      ]}>
                        <IconsTernal icon={item.iconn}/>
                        <Text style={styles.iconText}>{item.iconn}</Text>
                    </Pressable>)}
            />

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
    //Gastos
    container: {
      flex: 1,
      backgroundColor: "#f9f8ce",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingLeft:30,
      
      paddingBottom:30,
    },
    addSectionButton:{
        backgroundColor:"#45aab8",
        borderRadius:200,
        height:60, 
        position:"absolute",
        left:150,
        bottom:-35,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        alignContent:"center",  
    },
    // Gastos
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
        marginTop:30,
        marginHorizontal:20,
        marginBottom:200,
    },
    wrapperIcons:{
        justifyContent:"space-evenly",
        alignItems:"center",
        alignContent:"center",
        columnGap:12,
        flexWrap:"wrap",
    },
    icon:{
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        marginHorizontal:20,
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
        color: "#f48560", 
        fontWeight: "bold", 
    }, 
    input: { 
        width: 250, 
        height: 50, 
        borderWidth: 2, 
        borderColor: "#f48560", 
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
        left:5,
        top:10,
        padding:10,
        backgroundColor:"#e81e30",
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
    },

    //dropdown
    dropdownButtonStyle: {
    position:"relative",
    top:-95,
    right:-195,
    width: 180,
    height: 45,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  });
  






    