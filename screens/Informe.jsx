import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
 import {IconsTernal} from "../src/components/useIcons";
import PieChart from 'react-native-pie-chart'

const icons = [
  {icon :"Deport", color:"#e79eff"},
  {icon :"Alcohol",color:"#ffca99"},
  {icon :"Books",color:"#b8e4ff"},
  {icon :"RentHouse",color:"#eaffc2"},
  {icon :"Bus",color:"#fa5f49"},
  {icon :"Car",color:"#ff8097"},
  {icon :"CreditCard",color:"#ffe180"},
  {icon :"Technology",color:"#87CEFA"},
  {icon :"Bills",color:"#FFB7C3"},
  {icon :"Fun",color:"#FFA07A"},
  {icon :"Health",color:"#98FB98"},
  {icon :"Gift",color:"#95fab9"},
  {icon :"Shopping",color:"#b186f1"},
  {icon :"Clothes",color:"#c7f6d4"},
  {icon :"Education",color:"#9b9b9b"},
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
export default function Informe(){
  const [expenses, setExpenses] = useState()
  const [colorSeries, setColorSeries] = useState()
  const [resultSeries, setResultSeries] = useState()
  const [totalResult, setTotalResult] = useState(null)
  const [Incomes, setIncomes] = useState()
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

  console.log(new Date().getDay())

  const getIncomes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('incomes');
      if(jsonValue !== null){
        const values = JSON.parse(jsonValue)
        const filters = values.filter((el)=> new Date(el.date).getMonth() == time)
      
        const incomes = time === "all" ? values : filters

        let result = 0
        incomes.forEach(num => {
          const number = Number(num.value)
          result += number
        })
        setIncomes(result)

      }
    }catch (e) {
      alert(e)
    }
  };

  useEffect(()=>{   
    getIncomes()
    expenseFilter()
  },[time])

  async function getExpenses (icon) {
    let result = 0
    try {
      const jsonValue = await AsyncStorage.getItem('expenses');
      if(jsonValue !== null){
        const values = JSON.parse(jsonValue)
        let nums = values.filter(el=> time !== "all" ? el.icon === icon && new Date(el.date).getMonth() == time :  el.icon === icon )
          
        nums.forEach((num) => {
          const number = Number(num.value)
          result += number
        })
        return result
      }
    }
    catch (e) {
      alert(e)
    }
  };

  const expenseSeries = async ()=>{
    const iconsPromise = await Promise.all(icons.map(async (icon)=>{
      const single = await getExpenses(icon.icon) 
      return {icon: icon.icon, result:single , color: icon.color}
    }) 
    )
    return iconsPromise
  }
  
  const expenseFilter = async()=>{
    const series = await expenseSeries()
    const filters = series.filter(item => item.result > 0)
    const newFilters = filters.sort((a, b) => b.result - a.result)
    setExpenses(newFilters)

    const serieColor = []
    const serieResult = []
      filters.map((item)=>{
        serieColor.push(item.color)
        serieResult.push(item.result)
      })
      setColorSeries(serieColor)
      setResultSeries(serieResult)

      let result = 0
      if(serieResult !== null){
      serieResult.forEach(num=> {
        const number = Number(num)
        result += number
      })
      if(result === 0) setTotalResult(null)
      else setTotalResult(result)
    }

  }
  
 const BalanceChart = ()=>{
  if(totalResult === null) return (
    <View style={{justifyContent:"center", alignItems:"center",marginHorizontal:110,marginTop:110,}}>
      <ActivityIndicator size={"large"}/>
    </View>)

  else if(resultSeries !== undefined && colorSeries !== undefined && totalResult !== null && colorSeries.length !== 0 && resultSeries.length === colorSeries.length)
  return (
    <PieChart widthAndHeight={270} series={resultSeries} sliceColor={colorSeries} />
 )
  else return (
    <View>
      <Text>Loading...</Text>
    </View>) 
}

  
return (
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

      <View style={styles.container1}>
       <BalanceChart/>
       <View style={{gap:70, marginLeft:35 ,}}>
        <View>
          <Text style={{textAlign:"center",color:"green", fontStyle:"italic"}}>Ingresos</Text>
          <Text style={{textAlign:"center",color:"green"}}>${Incomes}</Text>
        </View>
        
        <View>
          <Text style={{textAlign:"center",color:"red", fontStyle:"italic"}}>Gastos </Text>
          <Text style={{textAlign:"center",color:"red"}}>${totalResult}</Text>
        </View>
        
        <View>
          <Text style={{textAlign:"center", fontStyle:"italic"}}>Balance </Text>
          <Text style={{textAlign:"center"}}>${Incomes - totalResult}</Text>
        </View>
        
       </View>
      </View>

      <View style={styles.container2}>

    { expenses !== undefined ?
      <FlatList 
                data={expenses}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Text> </Text>}
                renderItem={({item}) => (
                <View style={styles.itemBox}>
                  <View>
                      <IconsTernal icon={item.icon}/>
                  </View>
                  
                 <View style={[styles.singleItem,{backgroundColor:item.color}]}>
                  
                      <Text style={styles.textStyle}>
                          {item.icon}
                      </Text>

                      <Text style={styles.percentage}>
                        {Math.trunc(100*(item.result/Incomes))}%
                      </Text>

                      <Text style={styles.cost}>
                        ${item.result}
                      </Text >
                      
                  </View>
              </View>)}
            />
            : <ActivityIndicator size={"large"}/>    }

      </View>

    </View>
      )  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f8ce",
    },
    container1:{
      flexDirection:"row",
      justifyContent:"flex-start",
      alignContent:"flex-start",
      alignItems:"flex-start",
      marginTop:-25,
      paddingBottom:20,
      paddingLeft:20
    },
    container2:{
      flex:1,
      alignItems: "center",
      justifyContent:"center",
      alignContent:"center",
      paddingTop:15, 
      paddingHorizontal:10,
      borderTopWidth: 1,
    },
    ingresosText:{
      fontSize:10
    },
    //
    //items Balance
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
      borderRadius:15,
      flexDirection:"row",
      alignItems:"center",
      borderWidth:1,
    },
    textStyle:{
      marginLeft:20,
      color:"black",
    },
    percentage:{
      position:"absolute",
      left:150, 
    },
    cost:{
      position:"absolute",
      right:20,
      color:"black",
},

//dropdown
dropdownButtonStyle: {
  position:"relative",
  top:-55,
  right:-200,
  width: 200,
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

  