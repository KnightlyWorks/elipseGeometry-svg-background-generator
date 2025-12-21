
import Logo from '@assets/logo.svg';
import CloseIcon from '@assets/close-icon.svg';
import { useHistoryHotkeys } from '@hooks/useHistoryHotkeys';
import MenuButton from './headerComponents/MenuButton';
import HistoryControls from './headerComponents/HistoryControls';

const HeaderLogo = () => (
  <img src={Logo} alt="Logo" className="w-24 h-12 object-contain" />
);

const BurgerIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export default function Header({ 
  toggleSettingsFunction, 
  isSettingsOpen = false, 
  children, 
  undo, 
  redo, 
  canUndo, 
  canRedo, 
}) {
  useHistoryHotkeys({ undo, redo, canUndo, canRedo });

  const historyProps = { undo, redo, canUndo, canRedo };

  const SettingsTrigger = (
    <MenuButton onClick={toggleSettingsFunction} isOpen={isSettingsOpen}>
      {isSettingsOpen ? (
        <img src={CloseIcon} alt="Close" className="min-w-8 aspect-square" />
      ) : (
        <BurgerIcon />
      )}
    </MenuButton>
  );

  return (
    <header className="p-4 bg-background-elevated border-b border-purple-700/50 mb-6 rounded-b-2xl shadow-card">
      
      {/* Mobile Version */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex gap-4 items-center">
          <HistoryControls {...historyProps} />
          {children}
        </div>
        <div className='flex justify-between items-center w-full'>
          <HeaderLogo />
          {SettingsTrigger}
        </div>
      </div>

      {/* Desktop Version */}
      <div className='hidden md:flex items-center justify-between w-full'>
        <HeaderLogo />
        
        <div className="flex items-center gap-8">
          <HistoryControls {...historyProps} />
          <div className="flex">{children}</div>
          {SettingsTrigger}
        </div>
      </div>

    </header>
  );
}