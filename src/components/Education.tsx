import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Calendar, BookOpen } from 'lucide-react'

export default function Education() {
  const { t } = useTranslation()
  const subjects: string[] = t('education.subjects', { returnObjects: true }) as string[]

  return (
    <section id="education" className="py-20 md:py-32">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-subtitle text-center"
        >{t('education.label')}</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.08 }} className="section-title text-center"
        >{t('education.title')}</motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="card relative overflow-hidden group">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-blue-50 dark:from-accent-900/20 dark:to-blue-900/10 opacity-60" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Institution badge */}
              <div className="shrink-0 flex flex-col items-center lg:items-start gap-3">
                <div
                  className="rounded-2xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-xl shadow-accent-500/25"
                  style={{ width: 'clamp(4rem, 8vw, 7rem)', height: 'clamp(4rem, 8vw, 7rem)', fontSize: 'clamp(1rem, 2vw, 1.8rem)' }}
                >
                  {t('education.short')}
                </div>
                <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-full px-4 py-1.5"
                  style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {t('education.status')}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-gray-900 dark:text-white leading-tight"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)' }}>
                  {t('education.degree')}
                </h3>
                <p className="text-accent-600 dark:text-accent-400 font-semibold mt-1"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
                  {t('education.institution')}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400"
                    style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}>
                    <Calendar size={14} /> {t('education.period')}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400"
                    style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}>
                    <MapPin size={14} /> {t('education.location')}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
                  {t('education.description')}
                </p>

                {/* Subjects */}
                <div className="mt-5">
                  <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3"
                    style={{ fontSize: 'clamp(0.75rem, 1vw, 0.85rem)' }}>
                    <BookOpen size={14} />
                    Materias clave
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg px-3 py-1.5"
                        style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
