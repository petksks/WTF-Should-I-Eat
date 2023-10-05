export default async function fetchSichuanMeals (req, res) {
    const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?cuisine=Sichuan&number=1&apiKey=03578fe709fe4373adbe8b5984e4e5c3');
    const data = await response.json();
    await res.json(data);
    console.log(data);
}
