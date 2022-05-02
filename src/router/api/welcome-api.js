export function welcome_Api(router, services){
    router.get('/api', services.welcome_api)
}