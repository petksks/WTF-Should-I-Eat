"use client";
import { useEffect, useState, useCallback } from 'react';

interface Meal {
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strIngredients: string[];
}

const MealFetcher = () => {
    const [meal, setMeal] = useState<Meal | undefined>();
    const [view, setView] = useState('instructions');
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchMeal = useCallback(async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const mealData = data.meals[0];
        const ingredients = [];
    
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
    
        mealData.strIngredients = ingredients;
        setMeal(mealData);
        setButtonClicked(false);
    }, []);
    

    useEffect(() => {
        fetchMeal();
    }, [fetchMeal]);

    if (!meal) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 m-4 bg-gray-100 space-y-4">
            <h1 className="text-5xl font-extrabold dark:text-black">Wtf should you eat tonight?</h1>
            <button 
                style={{ backgroundColor: buttonClicked ? 'yellow' : 'white' }}
                className="group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow" 
                onClick={() => {
                    fetchMeal();
                    setButtonClicked(true);
                }}>
                <span className="relative text-black group-hover:text-black">No thank you.</span>
            </button>

            <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
            <img className="mb-4" src={meal.strMealThumb} alt={meal.strMeal} />
            <div>
                <button 
                    className={`group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow ${view === 'ingredients' ? 'bg-amber-400 text-white' : 'bg-white text-black'}`}
                    onClick={() => setView('ingredients')}
                >
                    <div className={`absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
                    <span className="relative group-hover:text-white">Ingredients</span>
                </button>
                <button 
                    className={`group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow ${view === 'instructions' ? 'bg-amber-400 text-white' : 'bg-white text-black'}`}
                    onClick={() => setView('instructions')}
                >
                    <div className={`absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
                    <span className="relative group-hover:text-white">Instructions</span>
                </button>
            </div>
            {view === 'instructions' ? (
                <ol className="list-decimal list-inside">
                    {meal.strInstructions.split('. ').map((step, index) => (
                        step && <li key={index} className="mb-2">{step}.</li>
                    ))}
                </ol>
            ) : (
                <ol className="list-decimal list-inside">
                    {meal.strIngredients.map((ingredient, index) => (
                        <li key={index} className="mb-2">{ingredient}</li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default MealFetcher;
