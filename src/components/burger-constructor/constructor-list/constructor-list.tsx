import styles from './constructor-list.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import { ingredientListProps } from '../../../utils/prop-types';

const ConstructorList = ({ ingredients }: ingredientListProps) => {
  const bun = ingredients[0];

  const middleIngredientsIndices = [8, 5, 11, 10, 10, 9, 6];

  const middleIngredients = middleIngredientsIndices.map(index => ingredients[index]);

  return (
    <section className='mb-10'>
      {/* Верхняя булочка */}
      <ConstructorItem
        key={`${bun._id}-top`}
        ingredient={bun}
        type='top'
        extraClass={styles.fix_item}
      />
      <ul className={styles.list}>
        {/* Маппим ингредиенты начинки */}
        {middleIngredients.map((ingredient, index) => (
          <li className={styles.item} key={`${ingredient._id}-${index}`}>
            <ConstructorItem ingredient={ingredient} />
          </li>
        ))}
      </ul>
      {/* Нижняя булочка */}
      <ConstructorItem
        key={`${bun._id}-bottom`}
        ingredient={bun}
        type='bottom'
        extraClass={styles.fix_item}
      />
    </section>
  );
};

export default ConstructorList;
