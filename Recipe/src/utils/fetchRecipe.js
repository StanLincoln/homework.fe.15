export const fetchRecipe = async (id, setRecipe) => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) throw new Error("Failed to get a recipe");
    const data = await response.json();
    setRecipe(data);
  } catch (err) {
    console.log(err);
  }
};

