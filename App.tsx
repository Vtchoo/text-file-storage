import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import TextFileStorage from './src/lib/TextFileStorage'

function App() {

    const [object, setObject] = useState<any>({ text: '' })

    async function loadFromStorage() {
        try {
            const result = await TextFileStorage.getItem('teste1')

            if (!result)
                return ToastAndroid.show('Não existe um objeto com esta chave!', ToastAndroid.LONG)
            
            setObject(JSON.parse(result))
            ToastAndroid.show('Objeto carregado com sucesso!', ToastAndroid.LONG)

            console.log(result)
        } catch (error) {
            ToastAndroid.show('Erro ao carregar objeto', ToastAndroid.LONG)
            console.log(error)
        }
    }
    
    async function saveToStorage() {
        try {
            await TextFileStorage.setItem('teste1', JSON.stringify(object))
            ToastAndroid.show('Objeto salvo com sucesso!', ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show('Erro ao salvar objeto', ToastAndroid.LONG)
            console.log(error)
        }
    }
    
    async function removeFromStorage() {
        
        try {
            await TextFileStorage.removeItem('teste1')
            ToastAndroid.show('Objeto removido com sucesso!', ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show('Erro ao remover objeto', ToastAndroid.LONG)
            console.log(error)
        }
    }

    return (
        <View style={[styles.container]}>
            <Text>{JSON.stringify(object)}</Text>
            <TextInput
                value={object.text}
                onChangeText={text => setObject({ text })}
            />
            <Button title='Salvar' onPress={saveToStorage} color='lightgreen'/>
            <Button title='Carregar' onPress={loadFromStorage} color='lightblue'/>
            <Button title='Remover' onPress={removeFromStorage} color='pink'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        backgroundColor: 'white'
    }
})

export default App
