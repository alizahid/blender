import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { IService } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Card as Service } from '../services'

interface Props {
  services: IService[]
}

export const LinkedServices: FunctionComponent<Props> = ({ services }) => {
  const { navigate } = useNavigation()

  return (
    <View>
      <Text style={styles.title}>Linked services</Text>
      {new Array(10).fill(services[0]).map((service) => (
        <Service
          onPress={(id) =>
            navigate('Service', {
              id
            })
          }
          service={service}
          style={styles.service}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  service: {
    borderTopColor: colors.backgroundDark,
    borderTopWidth: layout.border
  },
  title: {
    ...typography.subtitle,
    color: colors.foreground,
    margin: layout.margin
  }
})
