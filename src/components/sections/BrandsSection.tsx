import { Container } from "@/src/components/ui/container";
import { Section } from "@/src/components/ui/section";

const brands = [
  "Toyota",
  "Honda",
  "BMW",
  "Mercedes-Benz",
  "Kia",
  "Hyundai",
  "Nissan",
  "Volkswagen",
  "Audi",
  "Lexus",
  "Mazda",
  "Subaru",
];

function BrandBadge({ name }: { name: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-6 py-3 text-slate-200 font-medium hover:border-slate-600 hover:bg-slate-700/50 transition-all duration-200">
      {name}
    </div>
  );
}

export function BrandsSection() {
  return (
    <Section id="brands">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Популярные марки автомобилей
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Работаем со всеми популярными марками и многими другими
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <BrandBadge key={brand} name={brand} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400">И многие другие марки автомобилей</p>
        </div>
      </Container>
    </Section>
  );
}
