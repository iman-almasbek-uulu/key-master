import { Container } from "@/src/components/ui/container";
import { SocialLinks } from "@/src/components/ui/social-links";
import { siteConfig } from "@/src/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <SocialLinks iconSize={24} />

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} {siteConfig.name}. Все права защищены.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
