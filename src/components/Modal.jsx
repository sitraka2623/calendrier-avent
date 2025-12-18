import { translations } from '../utils/data'

const Modal = ({ isOpen, day, currentLang, surprise, onClose, onShare }) => {
  if (!isOpen) return null

  const renderSurprise = () => {
    if (!surprise) return null

    const { type, content, answer } = surprise

    switch (type) {
      case 'quote':
        return (
          <div className="text-lg leading-relaxed italic text-gray-700">
            {content}
          </div>
        )
      
      case 'riddle':
        return (
          <div>
            <div className="text-lg leading-relaxed mb-4 text-gray-700">
              {content}
            </div>
            {answer && (
              <details className="mt-4 p-4 bg-purple-50 rounded-lg">
                <summary className="cursor-pointer font-semibold text-purple-600">
                  Voir la réponse
                </summary>
                <p className="mt-2 text-gray-700">{answer}</p>
              </details>
            )}
          </div>
        )
      
      case 'recipe':
        return (
          <div className="text-left">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
              {content}
            </pre>
          </div>
        )
      
      case 'game':
        return (
          <div className="text-lg leading-relaxed text-gray-700">
            <pre className="whitespace-pre-wrap font-sans">{content}</pre>
          </div>
        )
      
      case 'diy':
        return (
          <div className="text-left">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
              {content}
            </pre>
          </div>
        )
      
      case 'music':
        return (
          <div className="text-lg leading-relaxed text-gray-700">
            <pre className="whitespace-pre-wrap font-sans">{content}</pre>
          </div>
        )
      
      case 'wallpaper':
        return (
          <div className="text-center">
            <div className="text-lg mb-4 text-gray-700">{content}</div>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors">
              📥 Télécharger
            </button>
          </div>
        )
      
      case 'promo':
        return (
          <div className="text-center">
            <div className="text-lg mb-4 text-gray-700">{content}</div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block">
              {content.match(/[A-Z0-9]+/g)?.[1] || 'CODE'}
            </div>
          </div>
        )
      
      default:
        return <div className="text-lg leading-relaxed text-gray-700">{content}</div>
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative animate-slideIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-4xl text-gray-600 hover:text-black transition-colors"
        >
          &times;
        </button>
        
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6">
          {translations[currentLang].day} {day}
        </h2>
        
        <div className="mb-6">
          {renderSurprise()}
        </div>
        
        <button
          onClick={onShare}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          {translations[currentLang].share}
        </button>
      </div>
    </div>
  )
}

export default Modal
