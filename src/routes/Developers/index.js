import { LIST_PATH as path } from '../../constants';

export default (store) => ({
    path,
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const Developers = require('./containers/DevelopersContainer').default;
            /*  Return getComponent   */
            cb(null, Developers)
            /* Webpack named bundle   */
        }, 'Developers')
    },
    getChildRoutes (partialNextState, cb) {
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const Developer = require('./routes/Developers').default;
            /*  Return getComponent   */
            cb(null, [
                Developer(store)
            ])
        })
    }
})