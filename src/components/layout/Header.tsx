import { Container } from "@/src/components/ui/container";
import { CustomButton } from "@/src/components/ui/custom-button";
import { SocialLinks } from "@/src/components/ui/social-links";
import { siteConfig } from "@/src/config/site";
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
              className="sm:max-w-[100px] max-w-[50px]"
              alt=""
            />
            <div className="flex flex-col leading-none text-[16px] sm:text-[22px] font-semibold tracking-tight font-[cursive] italic">
              <span className="text-white drop-shadow-[0_0_8px_rgba(15,23,42,0.9)]">
                Чип
              </span>{" "}
              <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(37,99,235,0.9)]">
                ключ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks className="hidden md:flex" iconSize={20} />
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
  );
}
