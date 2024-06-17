import { defineConfig, presetUno, presetIcons } from 'unocss'
import { icons } from '@iconify-json/mdi/icons.json'
const mdiIconNames = Object.keys(icons).map((name) => `i-mdi:${name}`)

export default defineConfig({
  presets: [
    presetUno({}),
    presetIcons({
      autoInstall: true,
      collections: {
        /** Icons see https://pictogrammers.com/library/mdi */
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  safelist: [...mdiIconNames],
  shortcuts: [
    {
      'flex-col': 'flex flex-col'
    }
  ]
})
