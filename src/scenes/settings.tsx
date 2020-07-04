import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_blender } from '../assets'
import { AppParamList } from '../navigators/app'
import { layout, typography } from '../styles'

interface Props {
  navigation: StackNavigationProp<AppParamList, 'Settings'>
  route: RouteProp<AppParamList, 'Settings'>
}

export const Settings: FunctionComponent<Props> = () => (
  <View style={styles.main}>
    <Image source={img_blender} style={styles.logo} />
    <Text style={styles.title}>Settings</Text>
  </View>
)

const styles = StyleSheet.create({
  logo: {
    height: layout.icon * 4,
    width: layout.icon * 4
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    ...typography.title,
    marginTop: layout.margin * 2
  }
})
