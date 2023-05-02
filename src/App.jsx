import Chat from './components/Chat/Chat'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
import './App.css'
import './App-light.css'
import './App-dark.css'
import Header from './components/Header/Header'
import { useContext } from 'react'
import { ThemeContext } from './contexts/theme.context'

function App() {

  const { themeSelected } = useContext(ThemeContext)

  return (
    <div className={themeSelected.theme === 'light' ? 'App-light' : 'App-dark'}>
      < Header />
      <div className='appRoutes' >
        <AppRoutes />
      </div >
      <Footer />
      <Chat />
    </ div>
  )
}

export default App


