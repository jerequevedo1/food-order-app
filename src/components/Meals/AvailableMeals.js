import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://foodorderapp-59bf1-default-rtdb.firebaseio.com/meals.json");

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

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
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setHttpError(error.message)
            setIsLoading(false);
        });

    }, []);

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>;
    }

    if (httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>;
    }

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