import React from 'react'
import App from './App'
import {
    HashRouterProviderDecorator,
    ReduxStoreProviderDecorator
} from '../stories/decorators/ReduxStoreProviderDecorator'

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterProviderDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true} />)
}
