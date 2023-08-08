export interface MenuModule {
  name: string
  iconName: `i-mdi:${string}`
  level: MenuLevel.Module
  children?: MenuGroup[]
}

export interface MenuGroup {
  name: string
  level: MenuLevel.Group
  children?: MenuItem[]
}

export interface MenuItem {
  name: string
  level: MenuLevel.Item
  routePath: string
  routeName: string
}

export enum MenuLevel {
  Module = 1,
  Group = 2,
  Item = 3
}