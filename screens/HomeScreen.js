import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { auth, db } from '../Firebase'
import { AddIcon, Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()

  // checking if firestore doc exists if not create one and set collection called 'chat-data'
  db.collection('data-pengguna').doc(auth.currentUser?.email).get().then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      db.collection('data-pengguna').doc(auth.currentUser?.email).set({
        email: auth.currentUser?.email,
      })
      db.collection('data-pengguna').doc(auth.currentUser?.email).collection('chat-data').add({
        nama: 'Admin',
        note: 'Selamat datang di WashWell Chat. Silahkan kirim pesan untuk memulai chat.'
      })
      db.collection('data-pengguna').doc(auth.currentUser?.email).collection('notification-data').add({
        id: 1,
        judul: "Selamat datang di WashWell",
        desc: "Silahkan menggunakan layanan kami dengan nyaman.",
        status: 0
      })
      db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').add({
        id: 0,
        email: "admin",
        rating: 0,
        komentar: 0,
      })

      console.log("No such document!");
    }
  }
  ).catch((error) => {
    console.log("Error getting document:", error);
  });
  

  return (
    <GluestackUIProvider config={config}>
      <Center h={height} bg="$primary400">
        <Text bold={true} size='xl' >Halo, {auth.currentUser?.email}</Text>
        
        <ButtonGroup direction={'column'} marginTop={20} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width} >
          <Button onPress={() => navigation.navigate('Chat')} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width} >
            <ButtonText color='black'>Chat Page</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate('Notification')} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.3 * width}>
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