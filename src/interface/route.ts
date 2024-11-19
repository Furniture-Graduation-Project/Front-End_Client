import React from 'react'

export interface IRoute {
  path: string
  component: React.ComponentType
  layout?: React.FC<{ children: React.ReactNode }>
  children?: IRoute[]
}
