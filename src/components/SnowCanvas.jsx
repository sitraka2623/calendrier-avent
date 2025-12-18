import { useEffect, useRef } from 'react'

const SnowCanvas = ({ enabled }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes = []
    const maxSnowflakes = 100

    class Snowflake {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 3 + 1
        this.speed = Math.random() * 1 + 0.5
        this.wind = Math.random() * 0.5 - 0.25
      }

      update() {
        this.y += this.speed
        this.x += this.wind

        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      }
    }

    for (let i = 0; i < maxSnowflakes; i++) {
      snowflakes.push(new Snowflake())
    }

    let animationId

    const animate = () => {
      if (enabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        snowflakes.forEach(flake => {
          flake.update()
          flake.draw()
        })
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [enabled])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default SnowCanvas
