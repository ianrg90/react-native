import {View, TextInput, Text, StyleSheet} from 'react-native'
import {GlobalStyles} from "../../colors/colors"

function Input({label, textIputConfig, style, isValid}) {

    let inputStyle = [styles.input]

    if(textIputConfig && textIputConfig.multiline){
        inputStyle.push(styles.inputMultiline) 
    }

    if(!isValid) {
        inputStyle.push(styles.invalidInput)
    }

  return (
    <View style = {[styles.inputContainer, style]}>
        <Text style = {[styles.label, !isValid && styles.invalidLabel]}>{label}</Text>
        <TextInput {...textIputConfig} style = {inputStyle}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 10,
    },

    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 5
    },

    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top" //documentation recomends
    },

    invalidLabel: {
        color: GlobalStyles.colors.error500
    },

    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    } 

})