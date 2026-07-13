import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ExternalLink, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = 2026

  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            © {year} <span className="font-semibold text-gray-700 dark:text-gray-200">Kelvis Guerrero</span> — {t('footer.rights')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xs text-gray-400 dark:text-gray-600"
          >
            {t('footer.built')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {[
              { icon: <Mail size={16} />, href: 'mailto:kelvisguerrero03@gmail.com', label: 'Email' },
              { icon: <ExternalLink size={16} />, href: 'https://www.linkedin.com/in/kelvis-guerrero-b51259201', label: 'LinkedIn' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={link.label}
                className="p-2 rounded-lg text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
