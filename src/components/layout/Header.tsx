import { Container } from "@/src/components/ui/container";
import { CustomButton } from "@/src/components/ui/custom-button";
import { SocialLinks } from "@/src/components/ui/social-links";
import { socialLinks } from "@/src/config/links";
import logo from "../../../public/images/logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      {" "}
      <Container>
        <div className="flex gap-10 items-center justify-between py-2">
          <div className="flex items-center gap-3 max-w-xs max-h-16">
            <img
              src={logo.src}
              className="sm:max-w-[200px] max-w-[120px]"
              alt=""
            />
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks className="hidden md:flex" iconSize={20} />
            <CustomButton
              variant="primary"
              size="sm"
              className="bg-[#4682B4]"
              href={socialLinks.whatsapp}
            >
              Связаться
            </CustomButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
