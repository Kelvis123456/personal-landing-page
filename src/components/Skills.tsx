import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const stack = {
  backend: [
    { name: 'C#', icon: '⚡', main: true, desc: 'Lenguaje principal' },
    { name: '.NET', icon: '🔷', main: true, desc: 'Framework principal' },
    { name: 'Python', icon: '🐍', main: false, desc: 'Scripting & automatización' },
    { name: 'SQL', icon: '🗄️', main: false, desc: 'Bases de datos relacionales' },
  ],
  frontend: [
    { name: 'JavaScript', icon: '🟨', main: false, desc: 'Lógica del cliente' },
    { name: 'HTML', icon: '🌐', main: false, desc: 'Estructura web' },
    { name: 'CSS', icon: '🎨', main: false, desc: 'Estilos y diseño' },
  ],
  tools: [
    { name: 'Git & GitHub', icon: '📦', main: false, desc: 'Control de versiones' },
    { name: 'Postman', icon: '📮', main: false, desc: 'Testing de APIs' },
    { name: 'REST APIs', icon: '🔗', main: true, desc: 'Diseño e integración' },
  ],
}

type StackItem = { name: string; icon: string; main: boolean; desc: string }

function TechCard({ item, delay }: { item: StackItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`relative card flex flex-col items-center justify-center gap-2 cursor-default text-center overflow-hidden group
        ${item.main ? 'border-accent-300 dark:border-accent-700/60 bg-accent-50/60 dark:bg-accent-900/20' : ''}`}
    >
      {item.main && (
        <span className="absolute top-2 right-2 text-[10px] font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider bg-accent-100 dark:bg-accent-900/40 px-2 py-0.5 rounded-full">
          Main
        </span>
      )}
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/0 to-blue-500/0 group-hover:from-accent-400/8 group-hover:to-blue-500/8 rounded-2xl transition-all duration-300" />

      <span style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{item.icon}</span>
      <p className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>
        {item.name}
      </p>
      <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  const categories = [
    { key: 'backend', label: t('skills.backend'), items: stack.backend },
    { key: 'frontend', label: t('skills.frontend'), items: stack.frontend },
    { key: 'tools', label: t('skills.tools'), items: stack.tools },
  ]

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-subtitle text-center"
        >{t('skills.label')}</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.08 }} className="section-title text-center"
        >{t('skills.title')}</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-14 mx-auto"
          style={{ maxWidth: '60ch', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
        >{t('skills.subtitle')}</motion.p>

        <div className="flex flex-col gap-12">
          {categories.map((cat, ci) => (
            <div key={cat.key}>
              <motion.p
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: ci * 0.06 }}
                className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5"
                style={{ fontSize: 'clamp(0.7rem, 1vw, 0.8rem)' }}
              >
                {cat.label}
              </motion.p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cat.items.map((item, ii) => (
                  <TechCard key={item.name} item={item} delay={ci * 0.05 + ii * 0.07} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
