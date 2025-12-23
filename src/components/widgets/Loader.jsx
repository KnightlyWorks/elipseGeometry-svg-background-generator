export default function Loader ({text = ''}) {
    return (
        <div className="p-4 size-full flex flex-col items-center justify-center text-xs opacity-50">
            <span>{text}...</span>
            <div className="size-16 animate-spin rounded-full border-t-4 border-t-border m-4"></div>
        </div>
    )
}