import React from 'react';
import { StyleSheet,TextInput,Picker ,Text, View } from 'react-native';
import Select from 'react-native-picker-select';

export default function CurrencyRow(props) {
 const {
  currency,
  selectedcurrency,
  onChangecurrency,
  amount,
  onChangeAmount,
  } = props;

    return (
      <View style={styles.container}>
        <View style={styles.aba}>
        
        <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        defaultValue={amount.toString()}
        value={amount}
        onChangeText={onChangeAmount}
        />
        </View>
       
       <View style={styles.picker}>
       <Picker selectedValue={selectedcurrency}
       mode={"dropdown"}
       onValueChange={onChangecurrency}
       >
         {currency.map(item =>(
            <Picker.Item key={item} label={item} value={item} />
         ))}
      
       </Picker>
       </View>


          
      </View>
    );
  }


  const styles = StyleSheet.create({
    container:{
      display:'flex',
      justifyContent: 'center',
      flexDirection:'row',
      borderWidth:1,
      borderColor:"#fff",

    },
    aba: {
      width:280,
      borderColor:"#fff",
    },
    picker:{
      width:110,
      borderLeftWidth:2,
      borderColor:"#120922",
      backgroundColor:'#D3D3D3',
    },
    input:{
      fontSize:25,
      color:"black",
      backgroundColor:'#fff',
      height:60,
    },
  });
  


  /*
  
      <View style={styles.picker}>
      <Picker selectedValue={tocurrency}
      mode={"dropdown"}
      onValueChange={(itemValue) => setTocurrency(itemValue)}
       >
         {currency.map(item =>(
            <Picker.Item key={item} label={item} value={item} />
         ))}
      
       </Picker>
  */