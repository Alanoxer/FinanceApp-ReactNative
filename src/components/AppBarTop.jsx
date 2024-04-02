import { View, Text, StyleSheet  } from "react-native"
import { useLocation, Link } from "react-router-native"
import Constants from 'expo-constants'


const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ebd668",
      flexDirection: 'row',
      paddingVertical: Constants.statusBarHeight - 50 ,
    },

    //Screen Registro start 
    title:{
        fontSize: 40,
        fontStyle: "italic",
        fontWeight:"500",
        marginTop:20,
        marginBottom:15,
        marginLeft:10,
    },

    regristroHeaders:{
        flexDirection:"row",
        width:500,
    },
    
    containerLeft:{
        justifyContent:"flex-start",
        width: 220,
    },
    containerLeftActive:{
        justifyContent:"flex-start",
        width: 220,
        borderBottomWidth:2,
    },
    textLeft:{
        textAlign:"left",
        fontSize:30,
        marginLeft:10,
        borderRightWidth:1,
    },

    containerRight:{
        justifyContent:"flex-end",
        alignContent:"flex-end",
        width: 220,
    },
    containerRightActive:{
        justifyContent:"flex-end",
        alignContent:"flex-end",
        width: 220,
        borderBottomWidth:2,
    },
    textRight:{
        textAlign:"right",
        fontSize:30,
        marginRight:40,
        borderLeftWidth:1,
    },
    //Screen Registro end
})

const AppBar = ()=>{
    const {pathname} = useLocation()
     
    switch(pathname){
        case "/" :
            return( 
                <View>
                    <Text style={styles.title}>
                    Register
                    </Text>
                    <View style={styles.regristroHeaders}>
                        <Link to='/' style={styles.containerLeftActive} underlayColor={"#ebd660"}>
                            <Text style={styles.textLeft}>Expenses</Text>
                        </Link>
                        
                        <Link to='/Ingresos'style={styles.containerRight} underlayColor={"#ebd660"}>
                            <Text style={styles.textRight}>Incomes</Text>
                        </Link>
                    </View>
                </View>
            
            )
        
        case "/Ingresos" :
            return( 
                <View>
                    <Text style={styles.title}>
                    Register
                    </Text>
                    <View style={styles.regristroHeaders}>
                        <Link to='/' style={styles.containerLeft} underlayColor={"#ebd660"}>
                            <Text style={styles.textLeft}>Expenses</Text>
                        </Link>
                            
                        <Link to='/Ingresos'style={styles.containerRightActive} underlayColor={"#ebd660"}>
                            <Text style={styles.textRight}>Incomes</Text>
                        </Link>
                       </View>
                </View>
                
                )

        case "/Informe":
            return(
            <Text style={styles.title}>Inform</Text>
            )
    
        
    }

}
const AppBarTop = ()=>{
    return(
    <View style={styles.container}>
        <AppBar/> 
    </View>
    )
}

export default AppBarTop