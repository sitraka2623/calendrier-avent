import CalendarDay from './CalendarDay'

const CalendarGrid = ({ openedDays, onOpenDay }) => {
  const today = new Date()
  const currentDayOfMonth = today.getDate()
  const currentMonth = today.getMonth()
  
  // Calculer combien de cases sont disponibles
  let maxAvailableDay = 0
  
  if (currentMonth === 11) {
    // Décembre : on peut ouvrir jusqu'au jour actuel
    // Ex: 18 décembre = case 18 disponible
    maxAvailableDay = currentDayOfMonth
  } else if (currentMonth === 0 && currentDayOfMonth <= 17) {
    // Janvier jusqu'au 17 : toutes les cases de décembre + jours de janvier
    maxAvailableDay = 31 + currentDayOfMonth
  } else if (currentMonth === 0 && currentDayOfMonth > 17) {
    // Après le 17 janvier : toutes les cases disponibles
    maxAvailableDay = 25
  } else if (currentMonth < 11) {
    // Avant décembre : aucune case disponible
    maxAvailableDay = 0
  } else {
    // Après janvier : toutes les cases disponibles
    maxAvailableDay = 25
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
      {Array.from({ length: 25 }, (_, i) => i + 1).map(day => {
        const isOpened = openedDays.includes(day)
        const isAvailable = day === maxAvailableDay && !isOpened // Case du jour (non encore ouverte)
        const isLocked = day > maxAvailableDay // Cases futures

        return (
          <CalendarDay
            key={day}
            day={day}
            isAvailable={isAvailable}
            isOpened={isOpened}
            isLocked={isLocked}
            onClick={() => onOpenDay(day)}
          />
        )
      })}
    </div>
  )
}

export default CalendarGrid
