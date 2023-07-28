export enum ButtonEnum {
  Refresh,
  CloseCurrent,
  CloseOther
}

export interface MenuItem {
  name: ButtonEnum
  text: string
}
