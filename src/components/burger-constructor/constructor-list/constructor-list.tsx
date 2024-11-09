import styles from './constructor-list.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import update from 'immutability-helper';

import { constructorListProps, ingredientItemProps } from '../../../utils/prop-types';
import { memo, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../services/slices';
import { useDrop } from 'react-dnd';
import ConstructorItemBun from './constructor-item/constructor-item-bun/constructor-item-bun';
import ConstructorItemSkeleton from './constructor-item/constructor-item-skeleton/constructor-item-skeleton';

const ConstructorList = memo(function ConstructorList({ onDropHandler }: constructorListProps) {
  const { bun, ingredients } = useAppSelector((store) => store.burgerConstructor);

  const [constructorIngredients, setConstructorIngredients] = useState(ingredients);

  useEffect(() => {
    setConstructorIngredients(ingredients);
  }, [ingredients]);

  const findIngredient = useCallback(
    (id: string) => {
      const ingredient = constructorIngredients.filter((ingredient) => ingredient.id === id)[0];
      return {
        ingredient,
        index: constructorIngredients.indexOf(ingredient),
      };
    },
    [constructorIngredients]
  );

  const moveIngredient = useCallback(
    (id: string, atIndex: number) => {
      const { ingredient, index } = findIngredient(id);
      setConstructorIngredients(
        update(constructorIngredients, {
          $splice: [
            [index, 1],
            [atIndex, 0, ingredient],
          ],
        })
      );
    },
    [findIngredient, constructorIngredients]
  );

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: ingredientItemProps) {
      onDropHandler(ingredient);
    },
  });

  const addBun = (position: "top" | "bottom" | undefined) =>
    bun ? (
      <ConstructorItemBun ingredient={bun} position={position} extraClass={styles.fix_item} />
    ) : (
      <ConstructorItemSkeleton text='Выберите булки' position={position} extraClass={styles.fix_item} />
    );

  return (
    <section className='mb-10' ref={dropTarget}>
      {addBun('top')}

      <ul className={`${styles.list}`}>
        {constructorIngredients.length ? (
          constructorIngredients.map((ingredient) => (
            <ConstructorItem key={ingredient.id} ingredient={ingredient} moveIngredient={moveIngredient} findIngredient={findIngredient} />
          ))
        ) : (
          <ConstructorItemSkeleton text='Выберите начинку и соусы' />
        )}
      </ul>

      {addBun('bottom')}
    </section>
  );
});

export default ConstructorList;
 