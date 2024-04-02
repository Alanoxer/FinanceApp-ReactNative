import React from 'react'
import { View,} from 'react-native'
import { Route, Routes  } from 'react-router-native'

import AppBar from './AppBar.jsx'
import AppBarTop from './AppBarTop.jsx'

import Informe from '../../screens/Informe.jsx'
import Gastos from '../../screens/registro/Gastos.jsx'
import Ingresos from '../../screens/registro/Ingresos.jsx'


export default function Main  () {
    return(
    <View style={{ flex: 1 }}>
        <AppBarTop/>
            <Routes>
                <Route path='/' element={<Gastos/>} exact/>
                <Route path='/Ingresos' element={<Ingresos/>} exact/>
                <Route path='/Informe' element={<Informe/>} exact/>
            </Routes>
        <AppBar />
    </View>
)
}

  