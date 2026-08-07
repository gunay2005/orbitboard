import { motion } from 'framer-motion'
import { Moon, Bell, Lock, User, Globe, Palette } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function Settings() {
  const { isDark, toggle } = useTheme()

  const sections = [
    {
      title: 'Appearance',
      items: [
        { icon: Palette, label: 'Theme', value: isDark ? 'Dark' : 'Light', action: toggle, type: 'toggle' },
        { icon: Globe, label: 'Language', value: 'English', type: 'select' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { icon: Bell, label: 'Push Notifications', value: 'Enabled', type: 'toggle' },
        { icon: Bell, label: 'Email Digest', value: 'Daily', type: 'select' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', value: 'Gunay Sadıxova', type: 'link' },
        { icon: Lock, label: 'Security', value: '2FA Enabled', type: 'link' },
      ],
    },
  ]

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-lg font-semibold dark:text-white text-slate-900">Settings</h3>
          <p className="text-sm text-slate-500">Manage your preferences and account</p>
        </motion.div>

        {sections.map((section, sIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-500">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{item.label}</p>
                    </div>
                  </div>
                  {item.type === 'toggle' ? (
                    <button
                      onClick={item.action}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        (item.label === 'Theme' && isDark) || (item.label !== 'Theme' && item.value === 'Enabled')
                          ? 'bg-cyan-500'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          (item.label === 'Theme' && isDark) || (item.label !== 'Theme' && item.value === 'Enabled')
                            ? 'left-6'
                            : 'left-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <span className="text-sm text-slate-500">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}