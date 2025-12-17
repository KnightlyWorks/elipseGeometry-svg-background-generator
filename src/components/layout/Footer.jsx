import ProjectLogo from '@assets/footer-logo.svg'; 
import GithubIcon from '@assets/github-mark-white.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 mt-5 border-t-2 bg-background-elevated rounded-t-xl shadow-[0_-25px_35px_rgba(126,34,206,0.25)] border-t-purple-700 flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <img src={ProjectLogo} alt="Logo" className="w-12 h-12 opacity-80" />
        <span className="text-sm font-medium tracking-tight text-text">
          Elipse Patterns <span className="text-text-secondary">Generator</span>
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-secondary">
        <span>© {currentYear} KnightlyWorks</span>
        <div className="w-1 h-3 bg-background" />
        <a 
          href="https://github.com/KnightlyWorks/elipseGeometry-svg-background-generator" 
          target="_blank" 
          rel="noreferrer"
          className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
        >
          <img src={GithubIcon} alt="" className="w-4 h-4 opacity-70" />
          Source Code
        </a>
      </div>
    </footer>
  );
}