import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut', delay } as const,
})

export default function About() {
  const { t } = useTranslation()

  const stats = [
    { value: t('about.stat_years'), label: t('about.stats.years') },
    { value: t('about.stat_internships'), label: t('about.stats.internships') },
    { value: t('about.stat_tech'), label: t('about.stats.technologies') },
    { value: t('about.stat_focus'), label: t('about.stats.focus') },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="section-container">
        <motion.p {...fadeUp(0)} className="section-subtitle text-center">{t('about.label')}</motion.p>
        <motion.h2 {...fadeUp(0.08)} className="section-title text-center">{t('about.title')}</motion.h2>

        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — avatar + bio */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="rounded-2xl bg-gradient-to-br from-accent-400 to-accent-700 flex items-center justify-center shadow-2xl shadow-accent-500/30"
                  style={{ width: 'clamp(5rem, 9vw, 8rem)', height: 'clamp(5rem, 9vw, 8rem)' }}
                >
                  <span
                    className="text-white font-extrabold select-none"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >KG</span>
                </div>
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-accent-400 to-blue-500 -z-10 blur-md opacity-30 animate-float" />
              </div>

              {/* Name + title */}
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white leading-tight" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
                  Kelvis Guerrero
                </p>
                <p className="text-accent-600 dark:text-accent-400 font-semibold mt-1" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                  Backend Developer · C# & .NET
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}>
              {t('about.bio')}
            </p>

            {/* Languages */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('about.languages_label')}:
              </span>
              {[
                { flag: '🇪🇸', lang: t('about.spanish'), level: t('about.spanish_level') },
                { flag: '🇺🇸', lang: t('about.english'), level: t('about.english_level') },
              ].map(l => (
                <div key={l.lang} className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                  <span className="text-xl">{l.flag}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-none">{l.lang}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{l.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — stats */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card flex flex-col items-center justify-center text-center gap-2 cursor-default"
              >
                <span
                  className="font-extrabold text-accent-600 dark:text-accent-400 leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {s.value}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-medium" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
