import { useState, useEffect, useRef } from 'react'
import SnowCanvas from './components/SnowCanvas'
import Header from './components/Header'
import CalendarGrid from './components/CalendarGrid'
import Modal from './components/Modal'
import { translations, surprises } from './utils/data'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [snowEnabled, setSnowEnabled] = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)
  const [openedDays, setOpenedDays] = useState([])
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    // Charger les cases ouvertes depuis localStorage
    const saved = JSON.parse(localStorage.getItem('openedDays') || '[]')
    setOpenedDays(saved)
    
    // Calculer les jours jusqu'à Noël
    updateCountdown()
    const interval = setInterval(updateCountdown, 3600000) // Mise à jour toutes les heures
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Gérer la musique
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // Volume à 50%
      
      if (musicEnabled) {
        // Essayer de jouer la musique
        const playPromise = audioRef.current.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('🎵 Musique de Noël en cours de lecture')
            })
            .catch(err => {
              console.error('Erreur de lecture audio:', err)
              alert('⚠️ Impossible de lire la musique. Vérifiez que votre navigateur autorise la lecture audio.')
              setMusicEnabled(false)
            })
        }
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0 // Remettre au début
      }
    }
  }, [musicEnabled])

  const updateCountdown = () => {
    const christmas = new Date(2025, 11, 25) // 25 décembre 2025
    const today = new Date()
    const diff = christmas - today
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    setDaysUntilChristmas(days)
  }

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled)
  }

  const handleOpenDay = (day) => {
    const today = new Date()
    const currentDayOfMonth = today.getDate() // Jour actuel du mois (1-31)
    const currentMonth = today.getMonth() // Mois actuel (0-11)
    
    // Logique simple : 
    // - En décembre : on peut ouvrir les cases jusqu'au jour actuel
    // - En janvier : on peut ouvrir toutes les cases de décembre + les jours de janvier
    
    let maxAvailableDay = 0
    
    if (currentMonth === 11) {
      // Décembre (mois 11)
      // Si on est le 18 décembre, on peut ouvrir jusqu'à la case 18
      maxAvailableDay = currentDayOfMonth
    } else if (currentMonth === 0 && currentDayOfMonth <= 17) {
      // Janvier (mois 0), jusqu'au 17
      // Toutes les cases de décembre (1-31) + les jours de janvier
      maxAvailableDay = 31 + currentDayOfMonth
    } else if (currentMonth === 0 && currentDayOfMonth > 17) {
      // Après le 17 janvier, toutes les cases sont disponibles
      maxAvailableDay = 25
    } else if (currentMonth < 11) {
      // Avant décembre, aucune case n'est disponible
      maxAvailableDay = 0
    } else {
      // Après janvier, toutes les cases sont disponibles
      maxAvailableDay = 25
    }
    
    // BLOQUER STRICTEMENT les cases futures
    if (day > maxAvailableDay) {
      alert(translations[currentLang].locked)
      return
    }
    
    // Si la case est déjà ouverte, on peut la réouvrir pour voir la surprise
    setSelectedDay(day)
    
    // Marquer comme ouvert si ce n'est pas déjà fait
    if (!openedDays.includes(day)) {
      const newOpenedDays = [...openedDays, day]
      setOpenedDays(newOpenedDays)
      localStorage.setItem('openedDays', JSON.stringify(newOpenedDays))
    }
  }

  const handleShare = () => {
    const text = translations[currentLang].shareText.replace('{day}', selectedDay)
    
    if (navigator.share) {
      navigator.share({
        title: 'Calendrier de l\'Avent',
        text: text
      })
    } else {
      alert(text)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 overflow-x-hidden relative">
      {/* Décorations de Noël en arrière-plan */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl">🎄</div>
        <div className="absolute top-20 right-20 text-8xl">⭐</div>
        <div className="absolute bottom-20 left-20 text-7xl">🎁</div>
        <div className="absolute bottom-10 right-10 text-9xl">🎅</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">❄️</div>
        <div className="absolute top-1/3 right-1/3 text-7xl">🔔</div>
      </div>
      
      <SnowCanvas enabled={snowEnabled} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header
          currentLang={currentLang}
          musicEnabled={musicEnabled}
          snowEnabled={snowEnabled}
          daysUntilChristmas={daysUntilChristmas}
          onToggleMusic={toggleMusic}
          onToggleSnow={() => setSnowEnabled(!snowEnabled)}
          onToggleLang={() => setCurrentLang(currentLang === 'fr' ? 'en' : 'fr')}
        />
        
        <CalendarGrid
          openedDays={openedDays}
          onOpenDay={handleOpenDay}
        />
        
        <Modal
          isOpen={selectedDay !== null}
          day={selectedDay}
          currentLang={currentLang}
          surprise={selectedDay ? surprises[currentLang][selectedDay - 1] : null}
          onClose={() => setSelectedDay(null)}
          onShare={handleShare}
        />
      </div>
      
      {/* Musique de Noël */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={(e) => {
          console.error('Erreur de chargement audio:', e)
          alert('⚠️ Impossible de charger la musique de Noël. Vérifiez votre connexion internet.')
        }}
        onLoadedData={() => {
          console.log('✅ Musique de Noël chargée avec succès')
        }}
      >
        {/* Plusieurs sources de musique de Noël gratuites */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4e3f4b524e.mp3" type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  )
}

export default App
