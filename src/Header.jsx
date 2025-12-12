import Logo from './assets/logo.svg'

export default function Header ({toggleSettingsFunction, isSettingsOpen = false}) {

    return (
        <header className='flex items-center justify-between p-4  bg-background-elevated border-b-purple-700 border-b-2 mb-4 rounded-b-md shadow-md'>
            <img src={Logo} />
            <MenuButton toggleSettingsFunction={toggleSettingsFunction}>
                {
                isSettingsOpen ?
                <svg className='text-purple-600' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
                </svg>
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