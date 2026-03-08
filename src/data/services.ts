export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "repair",
    title: "Ремонт автоключей",
    description: "Восстановление корпуса, замена кнопок, ремонт замков зажигания",
    icon: "wrench",
  },
  {
    id: "manufacturing",
    title: "Изготовление ключей",
    description: "Изготовление дубликатов и новых ключей для любых марок",
    icon: "key",
  },
  {
    id: "sale",
    title: "Продажа ключей",
    description: "Широкий ассортимент ключей и брелоков для автомобилей",
    icon: "shopping-bag",
  },
  {
    id: "programming",
    title: "Программирование чипов",
    description: "Прописка чипов и иммобилайзеров, настройка электроники",
    icon: "cpu",
  },
  {
    id: "recovery",
    title: "Восстановление при утере",
    description:
      "Полное восстановление доступа к автомобилю при потере ключей",
    icon: "shield-check",
  },
  {
    id: "on-site",
    title: "Выезд по Бишкеку и регионам",
    description:
      "Можем выехать к вам в Бишкеке и по регионам, чтобы решить вопрос с ключом на месте",
    icon: "map-pin",
  },
];
