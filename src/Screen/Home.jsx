import juice from "../assets/juice.jpg";

export function Home() {
  return (
    <div className="bg-lime-100 h-150 flex items-center justify-center gap-12 p-8">
      
      <img src={juice} alt="juice"className="w-64 h-64 rounded-full"
      />

      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-lime-900 mb-4">
          Fresh & Healthy Juice
        </h1>
        <p className="text-lime-500 text-lg">
          Start your day with the natural goodness of freshly squeezed juice.
         
        </p>
      </div>
      
    </div>
  );
}
