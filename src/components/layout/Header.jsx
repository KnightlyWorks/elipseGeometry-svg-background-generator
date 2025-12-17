import Logo from '@assets/logo.svg'
import CloseIcon from '@assets/close-icon.svg'

export default function Header ({toggleSettingsFunction, isSettingsOpen = false, children}) {

    return (
        <header className='flex items-center justify-between p-4  bg-background-elevated border-b-purple-700 border-b-2 mb-4 rounded-b-xl shadow-[0_25px_35px_rgba(126,34,206,0.25)]'>
            <img src={Logo} />

            <div className='flex items-center gap-4 justify-self-end'>
                {children}
            </div>
            <MenuButton toggleSettingsFunction={toggleSettingsFunction}>
                {
                isSettingsOpen ?
                <img className='text-purple-600' src={CloseIcon} />
                :
                <svg className='text-purple-600' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                }
            </MenuButton> 
        </header>
    )
}


function MenuButton ({children, toggleSettingsFunction}) {
    return (
        <button 
        className='
        w-fit rounded-full p-2 font-medium text-white transition-all duration-200
        bg-[image:--gradient-primary] hover:shadow-glow hover:opacity-90 active:scale-[0.97]' 
        onClick={(e) => {e.stopPropagation(); toggleSettingsFunction()}}>
            {children}
        </button>
    )
}