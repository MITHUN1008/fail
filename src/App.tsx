import { useState } from 'react'
import { Toaster } from "./components/ui/toaster"
import Chat from './components/Chat'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          Bolt AI Assistant
        </h1>
        <Chat />
      </main>
      <Toaster />
    </div>
  )
}

export default App