import React from 'react'
import { hydrate } from 'react-dom'
import App from './components/App'

const renderTarget = document.getElementById('root')
const app = <App />

hydrate(app, renderTarget)