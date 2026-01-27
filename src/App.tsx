import { useState } from 'react'

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'

type Screen = 'home' | 'profile' | 'lectures' | 'tests'

function App() {
  const [screen, setScreen] = useState<Screen>('home')

  return (
    <div>
      <Header
        onHome={() => setScreen('home')}
        onProfile={() => setScreen('profile')}
        title={screen === 'home' ? 'Главная' : screen === 'profile' ? 'Профиль' : screen === 'lectures' ? 'Лекции' : 'Тесты'}
      />

      <div style={{ padding: 16 }}>
        {screen === 'home' && (
          <HomeScreen
            onGoLectures={() => setScreen('lectures')}
            onGoTests={() => setScreen('tests')}
          />
        )}

        {screen === 'profile' && <ProfileScreen />}
        {screen === 'lectures' && <LecturesScreen />}
        {screen === 'tests' && <TestsScreen />}
      </div>
    </div>
  )
}

export default App
