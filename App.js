import React from 'react';
import { StyleSheet,Image,TextInput, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import CurrencyRow from './src/CurrencyRow';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Base_curre =  'https://api.exchangeratesapi.io/latest'

export default function App() {
  const [currency, setCurrency] = useState([]);
  const [fromcurrency, setFromcurrency] = useState();
  const [tocurrency, setTocurrency] = useState();
  const [exchangeRate,setExchangeRate] = useState();
  const [amount , setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }


useEffect(()=>{
fetch(Base_curre)
.then(res => res.json())
.then(data => {
  const FistCorrency = Object.keys(data.rates)[0]
  setCurrency([data.base,...Object.keys(data.rates)])
  setFromcurrency(data.base)
  setTocurrency(FistCorrency)
  setExchangeRate(data.rates[FistCorrency])
});
},[]);

useEffect(() => {
  if (fromcurrency != null && tocurrency != null) {
    fetch(`${Base_curre}?base=${fromcurrency}&symbols=${tocurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[tocurrency]))
  }
}, [fromcurrency, tocurrency])




const handleTextFrom = (text) => {
setAmount(text);
setAmountInFromCurrency(true)
}


const handletextTO = (text) => {
  setAmount(text);
  setAmountInFromCurrency(false)
}



  return (
    <>
    
    <View style={styles.container}>
    <Icon style={styles.icon2} name="coins" size={70} color={'#fff'} />
      
      <Text style={styles.titulo}>Currency exchange</Text>


      <CurrencyRow
      currency={currency}
      selectedcurrency={fromcurrency}
      onChangecurrency={(itemValue) => setFromcurrency(itemValue)}
      amount={fromAmount}
      onChangeAmount={handleTextFrom}
      />
      <Icon style={styles.icon} name="sync" size={30} color={'#fff'} />
      
      <CurrencyRow
      currency={currency}
      selectedcurrency={tocurrency}
      onChangecurrency={(itemValue) => setTocurrency(itemValue)}
      amount={toAmount}
      onChangeAmount={handletextTO}
      />

    <Text style={styles.name}>created by Andre Louis</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#120922',
  },
  titulo:{
    fontSize:25,
    color:'#fff',
  },
  barra:{
    color:'#fff',
    fontSize:25,
  },
  icon:{
    marginBottom:10,
    marginTop:10,
  },
  icon2:{
    marginBottom:50,
  },
  name:{
    color:'#fff',
  },
});
