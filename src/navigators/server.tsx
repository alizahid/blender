import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import {
  img_services_disks,
  img_services_environment,
  img_services_events,
  img_services_logs,
  img_services_metrics,
  img_services_settings,
  img_services_sharing
} from '../assets'
import { TopTabBar } from '../components'
import { useServer } from '../hooks'
import {
  Disks,
  Environment,
  Events,
  Logs,
  Metrics,
  Server,
  Sharing
} from '../scenes/services'
import { ServicesParamList } from './services'

export type ServerParamList = {
  Events: {
    id: string
  }
  Logs: {
    id: string
  }
  Disks: {
    id: string
  }
  Environment: {
    id: string
  }
  Sharing: {
    id: string
  }
  Metrics: {
    id: string
  }
  Settings: {
    id: string
  }
}

const { Navigator, Screen } = createMaterialTopTabNavigator<ServerParamList>()

interface Props {
  navigation: StackNavigationProp<ServicesParamList, 'Server'>
  route: RouteProp<ServicesParamList, 'Server'>
}

export const ServerNavigator: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { id }
  }
}) => {
  const { server } = useServer(id)

  useEffect(() => {
    if (server) {
      setOptions({
        title: server.name
      })
    }
  }, [server, setOptions])

  return (
    <Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <Screen
        component={Events}
        initialParams={{
          id
        }}
        name="Events"
        options={{
          tabBarIcon: img_services_events,
          title: 'Events'
        }}
      />
      <Screen
        component={Logs}
        initialParams={{
          id
        }}
        name="Logs"
        options={{
          tabBarIcon: img_services_logs,
          title: 'Logs'
        }}
      />
      <Screen
        component={Disks}
        initialParams={{
          id
        }}
        name="Disks"
        options={{
          tabBarIcon: img_services_disks,
          title: 'Disks'
        }}
      />
      <Screen
        component={Environment}
        initialParams={{
          id
        }}
        name="Environment"
        options={{
          tabBarIcon: img_services_environment,
          title: 'Environment'
        }}
      />
      <Screen
        component={Sharing}
        initialParams={{
          id
        }}
        name="Sharing"
        options={{
          tabBarIcon: img_services_sharing,
          title: 'Sharing'
        }}
      />
      <Screen
        component={Metrics}
        initialParams={{
          id
        }}
        name="Metrics"
        options={{
          tabBarIcon: img_services_metrics,
          title: 'Metrics'
        }}
      />
      <Screen
        component={Server}
        initialParams={{
          id
        }}
        name="Settings"
        options={{
          tabBarIcon: img_services_settings,
          title: 'Settings'
        }}
      />
    </Navigator>
  )
}
