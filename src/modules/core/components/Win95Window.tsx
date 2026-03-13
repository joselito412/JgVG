import { Cancel, Minus, Square } from "pixelarticons/react"

export default function Win95Window({ 
  title, 
  children, 
  className = "",
  onClose
}: { 
  title: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}) {
  return (
    <div className={`bg-[#c0c0c0] win95-raised ${className}`}>
      <div className="bg-[#000080] px-2 py-1 flex items-center justify-between select-none cursor-move">
        <span className="text-white font-[family-name:var(--font-pixel)] text-lg tracking-wide truncate">
          {title}
        </span>
        <div className="flex gap-1 shrink-0">
          <button className="win95-btn w-5 h-5 flex items-center justify-center p-0">
            <Minus className="pixelated w-3 h-3 text-black" />
          </button>
          <button className="win95-btn w-5 h-5 flex items-center justify-center p-0">
            <Square className="pixelated w-2.5 h-2.5 text-black" />
          </button>
          <button 
            className="win95-btn w-5 h-5 flex items-center justify-center p-0"
            onClick={onClose}
          >
            <Cancel className="pixelated w-3 h-3 text-black" />
          </button>
        </div>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}
