// Barra de stat con animacion
export default function RPGStatBar({ 
  label, 
  current, 
  max, 
  color,
  showNumbers = true,
  size = "normal"
}: { 
  label: string
  current: number
  max: number
  color: string
  showNumbers?: boolean
  size?: "small" | "normal"
}) {
  const percentage = (current / max) * 100
  const height = size === "small" ? "h-3" : "h-4"
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-lg md:text-xl w-12 drop-shadow-sm">{label}</span>
      <div className={`flex-1 rpg-stat-bar ${height} shadow-inner`}>
        <div 
          className={`rpg-stat-bar-fill ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showNumbers && (
        <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-base md:text-lg w-24 text-right drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
          {current}/{max}
        </span>
      )}
    </div>
  )
}
