import { Container } from '@/src/components/ui/container'
import { Section } from '@/src/components/ui/section'

const brands = [
  'Toyota',
  'Honda',
  'BMW',
  'Mercedes-Benz',
  'Kia',
  'Hyundai',
  'Nissan',
  'Volkswagen',
  'Audi',
  'Lexus',
  'Mazda',
  'Subaru',
]

function BrandBadge({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 px-6 py-3 text-slate-100/90 font-medium hover:border-cyan-500/60 hover:text-cyan-100 transition-colors duration-200">
      {name}
    </div>
  )
}

export function BrandsSection() {
  return (
    <Section
      id="brands"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <Container>
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Популярные марки автомобилей
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Работаем со всеми популярными марками и многими другими
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <BrandBadge
              key={brand}
              name={brand}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm md:text-base">
            И многие другие марки автомобилей
          </p>
        </div>
      </Container>
    </Section>
  )
}
