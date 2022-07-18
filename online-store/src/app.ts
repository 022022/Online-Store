import '../assets/css/style.css';
import { PageC } from './controller/pagec';

export const app = new PageC;

console.log(`

for students cross-check

Task:
https://github.com/rolling-scopes-school/tasks/tree/master/tasks/online-store


Score: 220/220

-[x] Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки.
-[x] Выполняются требования к вёрстке +10
-[x] Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине +10
-[x] Добавление товаров в корзину +20
-[x] Сортировка +20
-[x] Фильтры в указанном диапазоне от и до +30
-[x] Фильтры по значению +30
-[x] Можно отфильтровать товары по нескольким фильтрам разного типа +20
-[x] Сброс фильтров +20
-[x] Сохранение настроек в local storage +30
-[x] Поиск +30
`
)