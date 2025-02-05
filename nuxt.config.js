import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'SuperGreenLab - Growshop - Automated LED Grow Lights - All included bundles',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Transform any furniture into a connected growbox.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/global.css',
    '@/assets/css/froala_blocks.min.css',
    '@/assets/css/froala_editor.pkgd.min.css',
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/froala_style.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    //{ src: '~plugins/analytics.js', ssr: false },
    { src: '~plugins/matomo.js', ssr: false },
    //{ src: '~plugins/pixel.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-matomo', { matomoUrl: '//analytics.supergreenlab.com/', trackerUrl: '//analytics.supergreenlab.com/matomo.php', scriptUrl: '//analytics.supergreenlab.com/matomo.js', siteId: 1 }],
    'portal-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  generate: {
    routes: [
      '/designer/box/1',
      '/designer/box/2',
      '/designer/box/3',
      '/bundle/mono-box-bundle',
      '/bundle/multi-box-bundle',
      '/bundle/closet-box-bundle',
      '/bundle/micro-box-bundle',
      '/guide/how-to-install-a-led-panel',
      '/guide/how-to-setup-with-the-app',
    ]
  },

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  }
}
