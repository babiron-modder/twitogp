// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        '/api/**': {
            cors: true,
            headers: {
                'access-control-allow-methods': 'GET',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            proxy : { to : 'https://publish.twitter.com/**' }
            // proxy : { to : 'https://twitter.com/**' }
            // proxy : { to : 'https://qiita.com/api/**' }
        },
    }
})
