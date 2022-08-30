import React, { useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import "../../styles/Meals.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://order-food-71bbc-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, 900);
  }, []);

  if (isLoading) {
    const loadingStyle = {
      textAlign: "center",
      color: "#ccc",
      padding: "1rem",
    };

    return (
      <section style={loadingStyle}>
        <h3>Loading... Please wait.</h3>
      </section>
    );
  }

  if (httpError) {
    const errorStyle = {
      textAlign: "center",
      fontSize: "1.5rem",
      color: "#c23d18",
    };

    return (
      <section style={errorStyle}>
        <h3>{httpError}</h3>
      </section>
    );
  }

  const listOfMeals = meals.map((meal) => (
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
