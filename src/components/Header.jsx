import { translations } from '../utils/data'

const Header = ({
  currentLang,
  musicEnabled,
  snowEnabled,
  daysUntilChristmas,
  onToggleMusic,
  onToggleSnow,
  onToggleLang
}) => {
  return (
    <header className="text-center text-white mb-12">
      {/* Guirlande décorative */}
      <div className="text-6xl mb-4 animate-pulse">
        🎄 ⭐ 🎁 🔔 ❄️ 🎅 ⛄ 🎄
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl bg-gradient-to-r from-yellow-300 via-red-300 to-green-300 bg-clip-text text-transparent">
        {translations[currentLang].title}
      </h1>
      
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={onToggleMusic}
          className={`px-6 py-3 rounded-full border-4 text-white font-bold transition-all duration-300 hover:scale-110 shadow-xl ${
            musicEnabled 
              ? 'bg-green-600 border-green-300 animate-pulse' 
              : 'bg-red-700 border-red-400'
          }`}
        >
          {musicEnabled ? '🎵 ON' : '🔇 OFF'} {translations[currentLang].music}
        </button>
        
        <button
          onClick={onToggleSnow}
          className={`px-6 py-3 rounded-full border-4 text-white font-bold transition-all duration-300 hover:scale-110 shadow-xl ${
            snowEnabled 
              ? 'bg-blue-600 border-blue-300' 
              : 'bg-gray-700 border-gray-400'
          }`}
        >
          {translations[currentLang].snow}
        </button>
        
        <button
          onClick={onToggleLang}
          className="px-6 py-3 rounded-full border-4 border-purple-300 text-white font-bold bg-purple-600 transition-all duration-300 hover:scale-110 shadow-xl"
        >
          🌐 {currentLang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
      
      <div className="mt-6 bg-gradient-to-br from-red-600 to-green-600 rounded-2xl p-6 inline-block shadow-2xl border-4 border-yellow-400">
        <p className="text-xl mb-2 text-yellow-200 font-bold drop-shadow-lg">
          {translations[currentLang].countdownText}
        </p>
        <div className="text-6xl font-bold text-white drop-shadow-2xl">
          {daysUntilChristmas}
        </div>
        <p className="text-lg text-yellow-100 font-semibold mt-1">
          {daysUntilChristmas <= 1 ? 'jour' : 'jours'}
        </p>
      </div>
      
      {/* Décorations supplémentaires */}
      <div className="text-4xl mt-4">
        ✨ 🎊 ✨
      </div>
    </header>
  )
}

export default Header
