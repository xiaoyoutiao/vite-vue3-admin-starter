export interface MenuModule {
  name: string
  iconName: `i-mdi:${string}`
  type: MenuLevel.Module
  children?: MenuGroup[]
}

export interface MenuGroup {
  name: string
  type: MenuLevel.Group
  children?: MenuItem[]
}

export interface MenuItem {
  name: string
  type: MenuLevel.Item
  path: string
  code: string
}

export enum MenuLevel {
  Module = 1,
  Group = 2,
  Item = 3
}
