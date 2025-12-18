const icons = ['🎁', '⭐', '🎄', '❄️', '🔔', '🕯️', '🎅', '⛄', '🌟', '🎵']

const getRandomIcon = (day) => {
  // Utiliser le jour comme seed pour avoir toujours la même icône
  return icons[day % icons.length]
}

// Gradients uniques pour chaque jour
const dayBackgrounds = [
  'bg-gradient-to-br from-red-400 to-pink-600',      // Jour 1
  'bg-gradient-to-br from-blue-400 to-indigo-600',   // Jour 2
  'bg-gradient-to-br from-green-400 to-teal-600',    // Jour 3
  'bg-gradient-to-br from-purple-400 to-pink-600',   // Jour 4
  'bg-gradient-to-br from-yellow-400 to-orange-600', // Jour 5
  'bg-gradient-to-br from-pink-400 to-rose-600',     // Jour 6
  'bg-gradient-to-br from-indigo-400 to-purple-600', // Jour 7
  'bg-gradient-to-br from-teal-400 to-cyan-600',     // Jour 8
  'bg-gradient-to-br from-orange-400 to-red-600',    // Jour 9
  'bg-gradient-to-br from-cyan-400 to-blue-600',     // Jour 10
  'bg-gradient-to-br from-rose-400 to-pink-600',     // Jour 11
  'bg-gradient-to-br from-violet-400 to-purple-600', // Jour 12
  'bg-gradient-to-br from-lime-400 to-green-600',    // Jour 13
  'bg-gradient-to-br from-amber-400 to-orange-600',  // Jour 14
  'bg-gradient-to-br from-sky-400 to-blue-600',      // Jour 15
  'bg-gradient-to-br from-fuchsia-400 to-pink-600',  // Jour 16
  'bg-gradient-to-br from-emerald-400 to-teal-600',  // Jour 17
  'bg-gradient-to-br from-red-500 to-rose-700',      // Jour 18
  'bg-gradient-to-br from-blue-500 to-indigo-700',   // Jour 19
  'bg-gradient-to-br from-green-500 to-emerald-700', // Jour 20
  'bg-gradient-to-br from-purple-500 to-violet-700', // Jour 21
  'bg-gradient-to-br from-yellow-500 to-amber-700',  // Jour 22
  'bg-gradient-to-br from-pink-500 to-fuchsia-700',  // Jour 23
  'bg-gradient-to-br from-orange-500 to-red-700',    // Jour 24
  'bg-gradient-to-br from-red-600 to-green-600',     // Jour 25 - Noël!
]

const CalendarDay = ({ day, isAvailable, isOpened, isLocked, onClick }) => {
  const baseClasses = "relative rounded-2xl p-6 md:p-8 text-center transition-all duration-300 overflow-hidden"
  
  let cursorClasses = ""
  let hoverClasses = ""
  let statusIndicator = ""
  let overlayClasses = ""
  
  // Obtenir le fond unique pour ce jour
  const uniqueBg = dayBackgrounds[day - 1] || dayBackgrounds[0]
  
  if (isOpened) {
    // Case déjà ouverte - afficher son fond unique avec checkmark
    cursorClasses = "cursor-pointer"
    hoverClasses = "hover:-translate-y-2 hover:shadow-2xl"
    statusIndicator = "✓"
  } else if (isAvailable) {
    // Case disponible aujourd'hui - afficher son fond unique avec animation et marqueur
    cursorClasses = "cursor-pointer"
    hoverClasses = "hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-pulse"
    statusIndicator = "🎁" // Cadeau pour indiquer que c'est disponible aujourd'hui
  } else if (isLocked) {
    // Case verrouillée - afficher le fond mais avec overlay gris
    overlayClasses = "absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
    cursorClasses = "cursor-not-allowed"
    statusIndicator = "🔒"
  }

  // Empêcher le clic sur les cases verrouillées
  const handleClick = (e) => {
    if (isLocked) {
      // Effet visuel pour montrer que c'est verrouillé
      e.currentTarget.classList.add('shake')
      setTimeout(() => {
        e.currentTarget.classList.remove('shake')
      }, 500)
      onClick() // Appeler quand même pour afficher le message d'alerte
    } else {
      onClick()
    }
  }

  return (
    <div
      className={`${baseClasses} ${uniqueBg} text-white ${cursorClasses} ${hoverClasses} transform ${
        isAvailable ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-transparent' : ''
      }`}
      onClick={handleClick}
    >
      {/* Overlay pour les cases verrouillées */}
      {overlayClasses && <div className={overlayClasses}></div>}
      
      {/* Contenu de la case */}
      <div className="relative z-10">
        {statusIndicator && (
          <div className={`absolute -top-4 -right-4 text-3xl drop-shadow-lg ${isAvailable ? 'animate-bounce' : ''}`}>
            {statusIndicator}
          </div>
        )}
        
        {/* Badge "AUJOURD'HUI" pour la case disponible */}
        {isAvailable && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-red-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse border-2 border-red-600">
            AUJOURD'HUI
          </div>
        )}
        
        <div className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{day}</div>
        <div className="text-4xl md:text-5xl drop-shadow-lg">{getRandomIcon(day)}</div>
      </div>
    </div>
  )
}

export default CalendarDay
