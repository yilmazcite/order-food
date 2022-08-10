import React from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import "../../styles/Meals.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies!",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty.",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy... and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  //instead of mapping through the dummy data while returning the JSX element,
  //it is mapped through separately and each item is stored in a variable.
  const listOfMeals = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{listOfMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
