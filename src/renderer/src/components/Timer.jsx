import { useState, useEffect } from 'react'
import InputField from './InputField'

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCountingUp, setIsCountingUp] = useState(true)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [initialHours, setInitialHours] = useState(0)
  const [initialMinutes, setInitialMinutes] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)

  useEffect(() => {
    let interval
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        if (isCountingUp) {
          setTotalSeconds((prev) => prev + 1)
        } else {
          if (totalSeconds > 0) {
            setTotalSeconds((prev) => prev - 1)
          } else {
            setIsRunning(false)
          }
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isPaused, isCountingUp, totalSeconds])

  useEffect(() => {
    const total = hours * 3600 + minutes * 60 + seconds
    setTotalSeconds(total)
    setIsCountingUp(total === 0)
  }, [hours, minutes, seconds])

  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600)
    const m = Math.floor((totalSecs % 3600) / 60)
    const s = totalSecs % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handleStart = () => {
    setInitialHours(hours)
    setInitialMinutes(minutes)
    setInitialSeconds(seconds)
    setIsEditing(false)
    setIsRunning(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused((prev) => !prev)
  }

  const handleReset = () => {
    setHours(initialHours)
    setMinutes(initialMinutes)
    setSeconds(initialSeconds)
    setTotalSeconds(initialHours * 3600 + initialMinutes * 60 + initialSeconds)
    setIsPaused(false)
    setIsRunning(true)
  }

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label="Hours"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            />
            <button 
              onClick={handleStart}
              className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1 hover:bg-blue-600"
            >
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl font-mono p-4">
            {formatTime(totalSeconds)}
          </div>
          <div className="space-x-2">
            <button 
              onClick={handlePause}
              className="bg-red-500 text-stone-200 px-6 py-2 rounded-xl text-xl mt-2 hover:bg-red-600"
            >
              {isPaused ? 'Reanudar' : 'Pausar'}
            </button>
            <button 
              onClick={handleReset}
              className="bg-yellow-500 text-stone-200 px-6 py-2 rounded-xl text-xl mt-2 hover:bg-yellow-600"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
