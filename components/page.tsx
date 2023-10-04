"use client";
import { useEffect, useState, useCallback } from 'react';

const MealFetcher = () => {
    interface Meal {
        strMeal: string;
        strMealThumb: string;
        strInstructions: string;
        strIngredients: string;
    }

    const [meal, setMeal] = useState<Meal | undefined>();
    const [view, setView] = useState('instructions');

    const toggleView = () => {
        setView(view === 'instructions' ? 'ingredients': 'instructions')
    }

    const fetchMeal = useCallback(async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        console.log(data);
        setMeal(data.meals[0]);
    }, []);

    useEffect(() => {
        fetchMeal();
    }, [fetchMeal]);

    if (!meal) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 m-4 bg-gray-100 space-y-4">
            <h1 className="text-5xl font-extrabold dark.text-white">Wtf should you eat tonight?</h1>
            <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={fetchMeal}>
                <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black group-hover:text-white">No thank you.</span>
            </button>
            
            <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
            <img className="mb-4" src={meal.strMealThumb} alt={meal.strMeal} />
            <div>
                <button 
                    className={`group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow 
                        ${view === 'ingredients' ? 'bg-amber-400 text-white' : 'bg-white text-black'}`}
                    onClick={() => setView('ingredients')}
                >
                    <div className={`absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
                    <span className="relative group-hover:text-white">Ingredients</span>
                </button>
                <button 
                    className={`group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow 
                        ${view === 'instructions' ? 'bg-amber-400 text-white' : 'bg-white text-black'}`}
                    onClick={() => setView('instructions')}
                >
                    <div className={`absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
                    <span className="relative group-hover:text-white">Instructions</span>
                </button>
            </div>
            {view === 'instructions' ? (
                <ol className="list-decimal list-inside">
                    {meal.strInstructions.split('. ').map((step: string, index: number) => (
                        step && <li key={index} className="mb-2">{step}.</li>
                    ))}
                </ol>
            ) : (
                <ol className="list-decimal list-inside">
                    {/* Assuming you will have a way to parse ingredients into an array */}
                    {/* {meal.strIngredients.map((ingredient: string, index: number) => (
                        <li key={index} className="mb-2">{ingredient}</li>
                    ))} */}
                </ol>
            )}
        </div>
    );
};

export default MealFetcher;
