import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useState, useEffect } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://react-http-e261c-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('Something went Wrong')
      }
      const data = await response.json()
      const loadedMeals = []
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals) 
      setIsLoading(false)
    }
   

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])


  let content
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading.....</p>
  }






  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <section>{content}</section>
      </Card>
    </section>
  );
};

export default AvailableMeals;
