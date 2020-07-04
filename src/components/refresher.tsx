import React, { FunctionComponent } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

import { colors } from '../styles'

export const Refresher: FunctionComponent<RefreshControlProps> = (props) => (
  <RefreshControl {...props} tintColor={colors.primary} />
)
