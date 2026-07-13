import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const { t } = useTranslation()
  const roles: string[] = t('hero.roles', { returnObjects: true }) as string[]
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, roles])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-accent-950/20" />
        <div className="absolute top-1/4 -left-10 w-[600px] h-[600px] bg-accent-400/10 dark:bg-accent-600/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] bg-purple-400/5 dark:bg-purple-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="section-container pt-28 pb-20 text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-medium px-5 py-2 rounded-full mb-8 border border-accent-200 dark:border-accent-700/50"
          style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          Disponible para oportunidades
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mb-3"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.8rem)' }}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          className="font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-none"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 12rem)' }}
        >
          {t('hero.name')}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center mb-8"
          style={{ minHeight: 'clamp(2.5rem, 4vw, 4rem)' }}
        >
          <span
            className="font-mono font-semibold text-accent-600 dark:text-accent-400"
            style={{ fontSize: 'clamp(1rem, 3vw, 3rem)' }}
          >
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto text-gray-600 dark:text-gray-300 mb-12 leading-relaxed" style={{ maxWidth: '70ch' }}
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.5rem)' }}
        >
          {t('hero.summary')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticButton onClick={() => scrollTo('contact')}>
            <button className="btn-primary">
              <Mail size={20} />
              {t('hero.cta_contact')}
            </button>
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo('about')}>
            <button className="btn-outline">
              <ArrowDown size={20} />
              {t('hero.cta_scroll')}
            </button>
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  )
}
