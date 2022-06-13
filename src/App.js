import React, { useState } from 'react'
import List from './components/List'
import Details from './components/Details'


function App() {
  return (
    <div style={{ display: 'flex' }}>
      <List />
      <Details />
    </div>
  )
}

export default App
