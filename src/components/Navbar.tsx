import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const navLinks = ['about', 'skills', 'experience', 'education', 'contact'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { isDark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Focus trap + Escape-to-close + focus-restore for the mobile menu dialog.
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    const focusable = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    focusable?.[0]?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      toggleButtonRef.current?.focus()
    }
  }, [menuOpen])

  const switchLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 220)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono font-bold text-lg text-accent-600 dark:text-accent-400 hover:opacity-80 transition-opacity"
        >
          {'<KG />'}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all duration-200"
            >
              {t(`nav.${link}`)}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={switchLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Change language"
            aria-label="Change language"
          >
            <Globe size={14} />
            {i18n.language.startsWith('es') ? 'ES' : 'EN'}
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu btn */}
          <button
            ref={toggleButtonRef}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 pb-4"
          >
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-all"
              >
                {t(`nav.${link}`)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
