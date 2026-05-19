import { cn } from "../../lib/cn"

export function Button({
    onClick,
    label,
    shortKey,
    disabled
}:{
    onClick: () => void,
    label: string,
    shortKey: string,
    disabled?: boolean
}) {

    if(shortKey) {
        document.addEventListener('keydown', (e) => {
            if (e.key === shortKey) {
                onClick()
            }
        });
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick} 
            className={cn(
                'px-6 py-2 relative',
                'bg-gray-400 hover:bg-gray-500 text-gray-900',
                'transition shadow-sm hover:shadow-lg rounded-lg cursor-pointer',
                'uppercase font-bold',
                disabled && 'opacity-50 cursor-progress'
            )}
        >
            {label}
            {shortKey && <span className="text-[8px] absolute top-0 right-1">[{shortKey}]</span>}
        </button>
    )
}