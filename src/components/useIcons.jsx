import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from "react-router-native"

import CloseButton from "../../assets/close-ellipse-svgrepo-com.svg"
import WorkIcon from "../../assets/briefcase-svgrepo-com.svg"
import HouseIcon from "../../assets/house-svgrepo-com.svg"
import SellIcon from "../../assets/sold-svgrepo-com.svg"
import Deport from "../../assets/basketball-svgrepo-com.svg"
import Alcohol from "../../assets/beer-svgrepo-com.svg"
import Books from "../../assets/book-closed-svgrepo-com.svg"
import RentHouse from "../../assets/building-svgrepo-com.svg"
import Bus from "../../assets/bus-svgrepo-com.svg"
import Car from "../../assets/car-svgrepo-com.svg"
import CreditCard from "../../assets/credit-card-svgrepo-com.svg"
import Technology from "../../assets/imac-svgrepo-com.svg"
import Bills from "../../assets/light-bulb-svgrepo-com.svg"
import Fun from "../../assets/martini-svgrepo-com.svg"
import Health from "../../assets/med-kit-svgrepo-com.svg"
import Gift from "../../assets/present-svgrepo-com.svg"
import Shopping from "../../assets/shopping-card-svgrepo-com.svg"
import Clothes from "../../assets/t-shirt-svgrepo-com.svg"
import Education from "../../assets/student-svgrepo-com.svg"

const IconsTernal = ({icon})=>{
    return(
        icon === 'Work' ? <WorkIcon width={40} height={40}/> : null ||
        icon === "Rent" ? <HouseIcon width={40} height={40}/> : null ||
        icon === "Sell" ? <SellIcon width={40} height={40}/> : null ||
        icon === "Deport" ? <Deport width={40} height={40}/> : null ||
        icon === 'Alcohol' ? <Alcohol width={40} height={40}/> : null ||
        icon === "Books" ? <Books width={40} height={40}/> : null ||
        icon === 'RentHouse' ? <RentHouse width={40} height={40}/> : null ||
        icon === "Bus" ? <Bus width={40} height={40}/> : null ||
        icon === 'Car' ? <Car width={40} height={40}/> : null ||
        icon === "CreditCard" ? <CreditCard width={40} height={40}/> : null ||
        icon === 'Technology' ? <Technology width={40} height={40}/> : null ||
        icon === "Bills" ? <Bills width={40} height={40}/> : null ||
        icon === 'Fun' ? <Fun width={40} height={40}/> : null ||
        icon === "Health" ? <Health width={40} height={40}/> : null ||
        icon === "Gift" ? <Gift width={40} height={40}/> : null ||
        icon === 'Shopping' ? <Shopping width={40} height={40}/> : null ||
        icon === "Clothes" ? <Clothes width={40} height={40}/> : null ||
        icon === 'Education' ? <Education width={40} height={40}/> : null
        
    )
}

const Icons = ({ icon, value, date})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const {pathname} = useLocation()
    const active = pathname === "/"


    const deleteData = async (date) => {
        try {
            const currentSavedItems = await AsyncStorage.getItem(pathname === "/" ? "expenses" : "incomes")

        if(currentSavedItems !== null){
            const currentSavedItemsParsed = JSON.parse(currentSavedItems);
            console.log(currentSavedItemsParsed)

            const index = currentSavedItemsParsed.findIndex(el => el.date === date)
            console.log(index)
            currentSavedItemsParsed.splice(index, 1 )

            await AsyncStorage.setItem(
                pathname === "/" ? "expenses" : "incomes",
                 JSON.stringify(currentSavedItemsParsed));

        }
        } catch (e) {
          alert(e)
        }
      };

    const boxStyles = [
        styles.singleItem,
        active && styles.singleItemGastos
      ]

    const TextStyles = [
        styles.textStyle,
        active && styles.textStyleGastos
        ]

    return( 
    <View style={styles.itemBox}>
        <View>
            <IconsTernal icon={icon}/>
        </View>
        
       <View style={boxStyles}>
        
            <Text style={TextStyles}>
                {icon}
            </Text>
            <Text style={active ? styles.costGastos : styles.cost}>
                ${value}
            </Text >
            <Text style={active ? styles.fechaGastos : styles.fecha}>
                {new Date(date).toLocaleDateString()}
            </Text>
            
            <View style={styles.closeButton}>
            
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure do you want to erase this item?</Text>
                    <View style={{flexDirection:"row",gap:100,}}>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {deleteData(date) + setModalVisible(!modalVisible)}}>
                    <Text style={styles.textStyleModal}>Yes</Text>
                    </Pressable>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyleModal}>No</Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
                <Pressable onPress={()=>{setModalVisible(true)}}>
                    <CloseButton width={30} height={30}/>
                </Pressable> 
            
            </View>
            
        </View>
    </View>)

}

export {Icons, IconsTernal}

const styles = StyleSheet.create({
    itemBox:{
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center",
        gap:10,
        paddingBottom:6,
        borderBottomWidth:1,
    },
    singleItem:{
        width:300,
        height:40,
        borderRadius:20,
        flexDirection:"row",
        gap:30,
        alignItems:"center",
        backgroundColor:"#6ce180",
        borderWidth:1,
    },
    singleItemGastos:{
        width:300,
        height:40,
        borderRadius:20,
        flexDirection:"row",
        gap:30,
        alignItems:"center",
        backgroundColor:"#f48560",
        borderWidth:1,
        
    },
    closeButton:{
        position:"absolute",
        right:4,
        top:3,
        backgroundColor:"#f76d57",
        borderRadius:200,
        height:30, 
    },
    textStyle:{
        marginLeft:20,
        color:"black",
    },
    textStyleGastos:{
        marginLeft:20,
        color:"white", 
    },
    cost:{
        position:"absolute",
        left:120,
        color:"black",  
    },
    costGastos:{
        position:"absolute",
        left:120,
        color:"white",
    },
    fecha:{
        position:"absolute",
        right:40,
        color:"black",
    },
    fechaGastos:{
        position:"absolute",
        right:40,
        color:"white", 
    },
    //
    //Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#f2fff3',
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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#45aab8',
      },
      textStyleModal: {
        paddingHorizontal:10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
     
})
