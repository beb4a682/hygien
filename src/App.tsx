import { useState } from 'react'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'

type Screen = 'home' | 'profile' | 'lectures' | 'tests'

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home')

  return (
    <div style={{ padding: 16 }}>
      {/* Временная навигация (потом заменим на красивую) */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setActiveScreen('home')}>Home</button>
        <button onClick={() => setActiveScreen('profile')}>Profile</button>
        <button onClick={() => setActiveScreen('lectures')}>Lectures</button>
        <button onClick={() => setActiveScreen('tests')}>Tests</button>
      </div>

      {/* Рендерим один экран в зависимости от состояния */}
      {activeScreen === 'home' && <HomeScreen />}
      {activeScreen === 'profile' && <ProfileScreen />}
      {activeScreen === 'lectures' && <LecturesScreen />}
      {activeScreen === 'tests' && <TestsScreen />}
    </div>
  )
}

export default App
