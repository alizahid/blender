import { useNavigation } from '@react-navigation/native'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_dark_link, img_ui_dark_unlink } from '../../../assets'
import { IEnvGroup } from '../../../graphql/types'
import { colors, layout, typography } from '../../../styles'

interface Props {
  envGroups: IEnvGroup[]
  linkedGroups: IEnvGroup[]
  linking: boolean
  unlinking: boolean

  onLink: (envGroup: IEnvGroup) => void
  onUnlink: (envGroup: IEnvGroup) => void
}

export const EnvGroups: FunctionComponent<Props> = ({
  envGroups,
  linkedGroups,
  linking,
  onLink,
  onUnlink,
  unlinking
}) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Env groups</Text>
      {linkedGroups.map((envGroup) => (
        <View key={envGroup.id} style={styles.item}>
          <Pressable
            onPress={() =>
              navigate('EnvGroups', {
                initial: false,
                params: {
                  id: envGroup.id
                },
                screen: 'EnvGroup'
              })
            }
            style={styles.content}>
            <Text style={styles.name}>{envGroup.name}</Text>
            <View style={styles.vars}>
              <Text style={styles.label}>
                {pluralize('var', envGroup.envVars.length, true)}
              </Text>
            </View>
          </Pressable>
          {!unlinking && (
            <Pressable onPress={() => onUnlink(envGroup)} style={styles.button}>
              <Image source={img_ui_dark_unlink} style={styles.icon} />
            </Pressable>
          )}
        </View>
      ))}
      {envGroups
        .filter(({ id }) => !linkedGroups.map(({ id }) => id).includes(id))
        .map((envGroup) => (
          <View key={envGroup.id} style={styles.item}>
            <Pressable
              onPress={() =>
                navigate('EnvGroups', {
                  initial: false,
                  params: {
                    id: envGroup.id
                  },
                  screen: 'EnvGroup'
                })
              }
              style={styles.content}>
              <Text style={styles.name}>{envGroup.name}</Text>
              <View style={styles.vars}>
                <Text style={styles.label}>
                  {pluralize('var', envGroup.envVars.length, true)}
                </Text>
              </View>
            </Pressable>
            {!linking && (
              <Pressable onPress={() => onLink(envGroup)} style={styles.button}>
                <Image source={img_ui_dark_link} style={styles.icon} />
              </Pressable>
            )}
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center'
  },
  content: {
    flex: 1
  },
  icon: {
    height: layout.icon,
    margin: layout.padding,
    opacity: 0.5,
    width: layout.icon
  },
  item: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    flexDirection: 'row',
    marginTop: layout.margin
  },
  label: {
    ...typography.small,
    color: colors.foregroundLight
  },
  main: {
    padding: layout.margin
  },
  name: {
    ...typography.regular,
    color: colors.foreground
  },
  title: {
    ...typography.subtitle,
    color: colors.foreground
  },
  vars: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    marginTop: layout.padding,
    padding: layout.padding / 2
  }
})
