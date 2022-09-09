import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect,useState } from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {

        const fetchMeals = async () => {

            const response = await fetch("https://foodorderapp-59bf1-default-rtdb.firebaseio.com/meals.json");
            const responseData = await response.json();
            const loadeadMeals = [];

            for (const key in responseData) {
                loadeadMeals.push({
                    key: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadeadMeals);
        }
        fetchMeals();
    }, []);

    const mealList = meals.map(meal => {
        return <MealItem
            key={meal.id}
            meal={meal}
        ></MealItem>
    });

    return <section className={classes.meals}>
        <Card>
            <ul>{mealList}</ul>
        </Card>
    </section>;
}

export default AvailableMeals;