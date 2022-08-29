import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    const meal = props.meal;
    const price = `$${meal.price.toFixed(2)}`;

    return <li className={classes.meal}>
        <div>
            <h3>{meal.name}</h3>
            <div className={classes.description}>{meal.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.meal.id}></MealItemForm>
        </div>
    </li>;
}

export default MealItem;