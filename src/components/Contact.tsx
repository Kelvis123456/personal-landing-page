import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, ExternalLink, Copy, Check } from 'lucide-react'
import GlowCard from './GlowCard'

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const email = 'kelvisguerrero03@gmail.com'

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contacts = [
    {
      icon: <Mail size={22} />,
      label: t('contact.email_label'),
      value: email,
      href: `mailto:${email}`,
      action: copyEmail,
      actionIcon: copied ? <Check size={14} /> : <Copy size={14} />,
      actionLabel: copied ? t('contact.copied') : t('contact.copy_tooltip'),
    },
    {
      icon: <Phone size={22} />,
      label: t('contact.phone_label'),
      value: '+1 809-519-4004',
      href: 'tel:+18095194004',
    },
    {
      icon: <ExternalLink size={22} />,
      label: t('contact.linkedin_label'),
      value: 'kelvis-guerrero',
      href: 'https://www.linkedin.com/in/kelvis-guerrero-b51259201',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-subtitle text-center"
        >
          {t('contact.label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title text-center"
        >
          {t('contact.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-center text-gray-600 dark:text-gray-400 mx-auto mt-2 mb-12" style={{ maxWidth: '60ch' }}
        >
          {t('contact.subtitle')}
        </motion.p>

        <div className="grid gap-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
            <GlowCard className="card flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 shrink-0 group-hover:scale-110 transition-transform">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">{c.label}</p>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-gray-100 font-semibold hover:text-accent-600 dark:hover:text-accent-400 transition-colors truncate block"
                >
                  {c.value}
                </a>
              </div>
              {c.action && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={c.action}
                  title={c.actionLabel}
                  aria-label={c.actionLabel}
                  className="p-2 rounded-lg text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all shrink-0"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={copied ? 'check' : 'copy'}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {c.actionIcon}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}
            </GlowCard>
            </motion.div>
          ))}
        </div>

        <span role="status" aria-live="polite" className="sr-only">
          {copied ? t('contact.copied') : ''}
        </span>
      </div>
    </section>
  )
}
