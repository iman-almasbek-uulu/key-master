import logo from '../../../public/images/logo.png'

import { Container } from '@/src/components/ui/container'
import { CustomButton } from '@/src/components/ui/custom-button'
import { SocialLinks } from '@/src/components/ui/social-links'
import { siteConfig } from '@/src/config/site'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      {' '}
      <Container>
        <div className="flex gap-6 md:gap-10 items-center justify-between py-2">
          <div className="flex items-center">
            <img
              src={logo.src}
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
              alt="Логотип Автоключи Бишкек"
            />
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks
              className="hidden md:flex"
              iconSize={20}
            />
            <CustomButton
              variant="primary"
              size="sm"
              className="bg-[#4682B4]"
              href={`tel:${siteConfig.phone}`}
            >
              Связаться
            </CustomButton>
          </div>
        </div>
      </Container>
    </header>
  )
}
