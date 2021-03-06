import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts'

import { IDisk } from '../../../graphql/types'
import { colors, layout, typography } from '../../../styles'

interface Props {
  disk: IDisk
}

export const Metrics: FunctionComponent<Props> = ({ disk }) => {
  const { width } = Dimensions.get('window')

  const x = disk.metrics.slice(-5).map(({ time }) => moment(time).valueOf())
  const y = disk.metrics
    .slice(-5)
    .map(({ usedBytes }) => Math.round(usedBytes / 1024 / 1024))

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Disk usage</Text>
      <View style={styles.chart}>
        <View>
          <LineChart
            contentInset={{
              bottom: layout.margin,
              left: layout.margin,
              right: layout.margin,
              top: layout.margin
            }}
            data={y}
            style={{
              height: width * 0.5,
              width: width - (layout.margin * 4 + layout.padding)
            }}
            svg={{
              stroke: colors.primary,
              strokeWidth: layout.border * 2
            }}
            yMax={disk.sizeGB * 1024 * 1024}
            yMin={0}
          />
          <XAxis
            contentInset={{
              left: layout.margin * 2,
              right: layout.margin * 2
            }}
            data={x}
            formatLabel={(value) => `${moment(x[value]).format('HH:mm')}`}
            svg={{
              fill: colors.foregroundLight,
              fontSize: typography.tiny.fontSize
            }}
          />
        </View>
        <YAxis
          contentInset={{
            bottom: layout.margin,
            top: layout.margin
          }}
          data={y}
          formatLabel={(value) => prettyBytes(value * 1024 * 1024)}
          max={disk.sizeGB * 1024}
          min={0}
          numberOfTicks={3}
          svg={{
            fill: colors.foregroundLight,
            fontSize: typography.tiny.fontSize
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chart: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    flexDirection: 'row',
    marginTop: layout.margin,
    paddingBottom: layout.margin
  },
  main: {
    padding: layout.margin
  },
  title: {
    ...typography.subtitle,
    color: colors.primary
  }
})
