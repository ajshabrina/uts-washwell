import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase'
import { Box, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Alert } from 'react-native'
import { LogBox } from 'react-native'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'
import { AirbnbRating } from 'react-native-ratings'

export default function RatingScreen({route}) {
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()

  const { id, nomor, status } = route.params


  const handleSubmitRating = () => {
    Alert.alert(
      "Rating Terkirim",
      "Terima kasih sudah memberi rating.",
      [
        { text: "OK", onPress: () => {
            db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').doc(id).set({
              id: id,
              email: auth.currentUser?.email,
              rating: rating,
              komentar: komentar,
            })
            db.collection('data-pengguna').doc(auth.currentUser?.email).collection('notification-data').doc(id).update({
              status: 1
            })
            navigation.goBack()

          }
        }
      ]
    )
  }

  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");

  LogBox.ignoreAllLogs()

  if (status != 0) {
    db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').doc(id).get().then((doc) => {
      setRating(doc.data().rating)
      setKomentar(doc.data().komentar)
    })
  }

  return (
    status == 0 ?
    (<GluestackUIProvider config={config}>
      <ScrollView>
        <Box h={50}>

        </Box>

        <Box w={'100%'} alignItems='center'>
          <Text size='xl' bold={true}>
            Rating Pesanan: #Pesanan {nomor}
          </Text>
        </Box>

        <AirbnbRating 
          count={5}
          reviews={["Wahh, buruk banget", "Buruk", "Oke", "Bagus", "Bagus Banget!"]}
          defaultRating={0}
          size={30}
          reviewSize={20}
          onFinishRating={(rating) => setRating(rating)}
          starContainerStyle={{ gap: 20 }}
        />

        <Box w={'100%'} alignItems='center' marginTop={45} height={250} paddingLeft={15} paddingRight={15}>
          <Text size='xl' bold={true}>
            Tambahkan Komentar
          </Text>
          <Textarea
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
              w={'100%'}
              h={'55%'}
              bg='#D9D9D9'
              borderRadius={15}
              borderBlockColor='#D9D9D9'
              borderBlockWidth={2}
              borderBlockStyle='solid'
              borderColor='#D9D9D9'
              marginTop={10}
            >
              <TextareaInput value={komentar} onChangeText={(text) => setKomentar(text)} placeholder='Masukkan komentar kamu disini.'/>
            </Textarea>
        </Box>

        <Box w={'100%'} alignItems='center' marginTop={0}>
          <Button marginTop={0} borderRadius={15} size="xl" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.5 * width}>
            <ButtonText onPress={handleSubmitRating} color='black'>Kirim</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </GluestackUIProvider>)
    :
    (<GluestackUIProvider config={config}>
      <ScrollView>
        <Box h={50}>

        </Box>

        <Box w={'100%'} alignItems='center'>
          <Text size='xl' bold={true}>
            Kamu telah me-rating #Pesanan {nomor}
          </Text>
        </Box>

        <AirbnbRating 
          count={5}
          reviews={["Wahh, buruk banget", "Buruk", "Oke", "Bagus", "Bagus Banget!"]}
          defaultRating={rating}
          size={30}
          reviewSize={20}
          isDisabled={true}
          onFinishRating={(rating) => setRating(rating)}
          starContainerStyle={{ gap: 20 }}
        />

        <Box w={'100%'} alignItems='center' marginTop={45} height={250} paddingLeft={15} paddingRight={15}>
          <Text size='xl' bold={true}>
            Komentar
          </Text>
          <Textarea
              size="md"
              isReadOnly={true}
              isInvalid={false}
              isDisabled={false}
              w={'100%'}
              h={'55%'}
              bg='#D9D9D9'
              borderRadius={15}
              borderBlockColor='#D9D9D9'
              borderBlockWidth={2}
              borderBlockStyle='solid'
              borderColor='#D9D9D9'
              marginTop={10}
            >
              <TextareaInput value={komentar} onChangeText={(text) => setKomentar(text)} placeholder='Masukkan komentar kamu disini.'/>
            </Textarea>
        </Box>

       
      </ScrollView>
    </GluestackUIProvider>)
  )
}

const styles = StyleSheet.create({})