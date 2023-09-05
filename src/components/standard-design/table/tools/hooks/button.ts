import { type InjectionKey, type SetupContext} from 'vue'
import TBButton from '../TBButton.vue'
import { type ButtonType } from 'element-plus'

export interface ButtonGroupProps {
  max?: number
}
export interface ButtonProps {
  type?: ButtonType
  permission?: string
  confirm?: true | string
  dropdown?: boolean
  disabled?: boolean
}

export interface ButtonContext {
  uid: number
  props: ButtonProps
  slots: SetupContext['slots']
  hasPermission: (code: string) => boolean
  onClick: () => void
  onConfirm: () => void
}

interface ButtonGroupProvider extends ReturnType<typeof useButtonGroup> {
  name: 'ButtonGroup'
}

export type TBButtonInstance = InstanceType<typeof TBButton>

export const InjectkeyWithButtonGroup = Symbol() as InjectionKey<ButtonGroupProvider>

export function useButtonGroup(props: ButtonGroupProps) {
  let displayUID: number

  const buttonContexts = ref<ButtonContext[]>([])
  const dropdownButtonContexts = computed(() =>
    !isOverflow.value
      ? []
      : buttonContexts.value
          .slice(1)
          .filter((item) =>
            item.props.permission ? item.hasPermission(item.props.permission) : true
          )
  )
  const setButton = (context: ButtonContext) => {
    if (!context.props.dropdown) {
      if (displayUID === undefined) displayUID = context.uid
      buttonContexts.value.push(context)
    }
  }
  const isOverflow = computed(() => buttonContexts.value.length > (props.max as number))
  const canDisplay = (uid: number) => uid === displayUID

  return {
    buttonContexts,
    setButton,
    dropdownButtonContexts,
    canDisplay,
    props
  }
}
