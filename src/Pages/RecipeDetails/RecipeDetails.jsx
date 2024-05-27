import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data: recipedetails = [] } = useQuery({
    queryKey: ["recipedetails"],
    queryFn: async () => {
      const res = await fetch(
        `https://food-recipe-share-server.vercel.app/recipedetails/${id}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(recipedetails);
  return (
    <div>
      <div className="h-3/4 w-1/2 mx-auto rounded-2xl">
        <div>
          <iframe
            className="h-full w-full rounded-2xl aspect-video object-cover"
            src={`https://www.youtube.com/embed/${recipedetails.embeddedCode}`}
            title="youtube video"
          ></iframe>
          <div className="my-10 text-lg">
            <p className="text-4xl font-bold text-black">
              {recipedetails.recipeName}
            </p>
            <p className="font-semibold my-2">
              Total Watch: {recipedetails.watchCount}
            </p>
            <p className="font-semibold my-2">
              Recipe Category: {recipedetails.category}
            </p>
            <p className="font-semibold my-2">
              Dishes: {recipedetails.country}
            </p>
            <p className="font-semibold my-2">
              Creator : {recipedetails.creatorEmail}
            </p>
            <p>{recipedetails.recipeDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
