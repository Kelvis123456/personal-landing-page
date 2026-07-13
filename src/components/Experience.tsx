import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'

interface ExperienceItem {
  role: string
  type: string
  company: string
  period: string
  location: string
  description: string
  bullets: string[]
  tags: string[]
}

export default function Experience() {
  const { t } = useTranslation()
  const items: ExperienceItem[] = t('experience.items', { returnObjects: true }) as ExperienceItem[]

  return (
    <section id="experience" className="py-20 md:py-32 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-subtitle text-center"
        >{t('experience.label')}</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.08 }} className="section-title text-center"
        >{t('experience.title')}</motion.h2>

        <div className="mt-14 relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-accent-500 via-accent-400/50 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="sm:pl-10 relative"
              >
                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-0 top-5 w-3 h-3 rounded-full bg-accent-500 border-2 border-white dark:border-gray-950 shadow-md shadow-accent-500/40 -translate-x-1/2 z-10" />

                <div className="card hover:border-accent-300 dark:hover:border-accent-700/60 transition-colors group">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 font-bold rounded-md px-2 py-0.5"
                          style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)' }}
                        >
                          {item.type}
                        </span>
                        <h3
                          className="font-extrabold text-gray-900 dark:text-white"
                          style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
                        >
                          {item.role}
                        </h3>
                      </div>
                      <p
                        className="text-accent-600 dark:text-accent-400 font-semibold"
                        style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                      >
                        {item.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-gray-500 dark:text-gray-400 shrink-0"
                      style={{ fontSize: 'clamp(0.75rem, 1vw, 0.88rem)' }}>
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{item.period}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 dark:text-gray-400 mb-4 italic"
                    style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}>
                    {item.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.05 }}
                        className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300"
                        style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-2" />
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono font-semibold rounded-md px-3 py-1"
                        style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
