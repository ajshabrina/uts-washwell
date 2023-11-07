import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { auth } from '../Firebase'
import { AddIcon, Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()

  

  return (
    <GluestackUIProvider config={config}>
      <Center h={height} bg="$primary400">
        <Text bold={true} size='xl' >Halo, {auth.currentUser?.email}</Text>
        
        <ButtonGroup direction={'column'} marginTop={20} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width} >
          <Button onPress={() => navigation.navigate('Chat')} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width} >
            <ButtonText color='black'>Chat Page</ButtonText>
          </Button>
          <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width}>
            <ButtonText color='black'>Notifikasi</ButtonText>
          </Button>
          <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width}>
            <ButtonText color='black'>Rating</ButtonText>
          </Button>
        </ButtonGroup>
        

      </Center>
    </GluestackUIProvider>

    // <GluestackUIProvider config={config}>
    //   <Button>
    //     <ButtonText>Hello world</ButtonText>
    //   </Button>
    // </GluestackUIProvider>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

})