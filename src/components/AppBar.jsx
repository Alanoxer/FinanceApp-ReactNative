import React from 'react'
import { View ,Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Link, useLocation } from 'react-router-native'

import FileBackup from "../../assets/file-2-svgrepo-com"
import Chart from "../../assets/chart-pie-svgrepo-com.svg"



const AppBarTab = ({ children, to }) => {
    const { pathname } = useLocation()
    const active = pathname === to 
    
  
    const textStyles = [
      styles.text,
      active && styles.active
    ]
  
    return (
      <Link to={to} underlayColor={"#ebd660"}>
        <Text style={textStyles}>
          {children}
        </Text>
      </Link>
    )
  }

  const AppBar = () => {
    return(
      <View style={styles.container}>
        <View style={styles.links} >
          <Link to='/' underlayColor={"#ebd660"} >
            <FileBackup width={40} height={40} />
          </Link>
        
          <AppBarTab to='/'>
            Register
          </AppBarTab>
        </View>

        <View style={styles.links}>
          <Link to='/Informe' underlayColor={"#ebd660"}>
            <Chart width={40} height={40}/>
          </Link>
            <AppBarTab to='/Informe'>
              Inform
            </AppBarTab>
        </View>
     
      </View>

        )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      justifyContent:"space-evenly",
      backgroundColor: "#ebd668",
      flexDirection: 'row',
      paddingVertical: Constants.statusBarHeight - 24,
      borderTopWidth:1,
    },
    text: {
      color: "#3b3b38",
      
    },
    active: {
      color: "#fffbdb"
    },
    links: {
      alignContent:"center",
      alignItems:"center",
      alignSelf:"center",
      justifyContent:"center",
      marginHorizontal:10
    }
  })

export default AppBar