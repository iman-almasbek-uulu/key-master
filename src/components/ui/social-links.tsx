import { Instagram, MessageCircle, Send } from 'lucide-react'

import { socialLinks } from '@/src/config/links'

interface SocialLinksProps {
  className?: string
  iconSize?: number
}

export function SocialLinks({
  className = '',
  iconSize = 20,
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram size={iconSize} />
      </a>
      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
        aria-label="WhatsApp"
      >
        <MessageCircle size={iconSize} />
      </a>
      <a
        href={socialLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
        aria-label="Telegram"
      >
        <Send size={iconSize} />
      </a>
    </div>
  )
}
