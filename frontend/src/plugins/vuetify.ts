import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        icons: {
            defaultSet: 'md',
            aliases,
            sets: {
                md
            }
        },
    })

    // Vue.js で Vuetify を使用する
    nuxtApp.vueApp.use(vuetify)
})