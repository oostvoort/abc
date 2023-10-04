import React from 'react'
import MainLayout from './components/MainLayout'
import ScreenAtomRenderer from './components/ScreenAtomRenderer'

export const App = () => {
    return (
        <MainLayout>
            <ScreenAtomRenderer />
        </MainLayout>
    )
}
