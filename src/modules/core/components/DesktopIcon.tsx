export default function DesktopIcon({ 
  icon, 
  label, 
  onClick, 
  href,
  isActive = false
}: { 
  icon: React.ReactNode | string; 
  label: string; 
  onClick?: () => void; 
  href?: string;
  isActive?: boolean;
}) {
  const content = (
    <div className={`flex flex-col items-center justify-start gap-3 md:gap-4 p-2 md:p-4 hover:bg-[#000080]/30 group transition-all rounded-xl cursor-pointer h-full ${isActive ? 'bg-[#000080]/40 ring-2 ring-[#f5a623] shadow-[0_0_15px_rgba(245,166,35,0.4)]' : ''}`}>
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center bg-transparent group-hover:scale-110 transition-transform ${isActive ? 'drop-shadow-[0_0_15px_rgba(245,166,35,0.8)] scale-110' : 'drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]'}`}>
        {typeof icon === 'string' ? (
           <span className="text-5xl sm:text-6xl md:text-[6rem] drop-shadow-lg leading-none">{icon}</span>
        ) : (
           icon
        )}
      </div>
      <span className={`font-pixel text-sm sm:text-base md:text-xl px-2 sm:px-4 py-1.5 text-center leading-tight rounded-md border-2 transition-all mt-auto shadow-black ${isActive ? 'text-[#f5a623] border-[#f5a623] bg-[#0a0a14] drop-shadow-[2px_2px_0_#f5a623] font-bold' : 'text-white border-transparent drop-shadow-[1px_2px_0_#000] group-hover:bg-[#000080] group-hover:border-white group-hover:text-white'}`}>
        {label}
      </span>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="outline-none h-full block">
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className="outline-none h-full w-full">
      {content}
    </button>
  )
}
