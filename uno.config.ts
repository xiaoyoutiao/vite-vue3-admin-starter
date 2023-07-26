import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({}),
    presetIcons({
      collections: {
        /** Icons see https://pictogrammers.com/library/mdi */
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
})
