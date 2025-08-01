import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Blocks } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import CyberCard from '../sections/CyberCard';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowButton(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    const pdfUrl = '/textures/CVAmit.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'amitsahoo.pdf'  // Changed the download filename here
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        {showButton ? (
            <motion.div className="pt-2 flex items-center space-x-4">
            <CyberCard />
            <button
                onClick={handleDownload}
                className={`px-3 py-1 font-mono rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white shadow-[0_0_15px_rgba(17,24,39,0.5)] hover:shadow-[#744FEF]'
                    : 'text-black hover:bg-gray-200'
                }`}
              >
              Download CV
            </button>
          </motion.div>
          ) : (
            <div className="w-32 pt-2"></div> // Placeholder element with the same width as the button
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#blogs">Blogs</NavLink>
            <NavLink href="#web3">Web3</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
          <MobileNavLink href="#blogs" onClick={() => setIsOpen(false)}>Blogs</MobileNavLink>
          <MobileNavLink href="#web3" onClick={() => setIsOpen(false)}>Web3</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        </div>
      </motion.div>
    </motion.nav>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
  >
    {children}
  </motion.a>
);