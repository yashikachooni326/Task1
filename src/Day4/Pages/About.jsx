import about from "../../assets/about.png";

export const About = () => {
  return (
    <div className="w-full  py-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={about}
            alt="About DressLike"
            className="w-full max-w-md object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">About Us</h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            At <span className="font-semibold text-purple-600">DressLike</span>, we believe fashion is more than clothing—it's a statement, a lifestyle, and a way to express your unique personality. Our curated collections combine timeless elegance with modern trends, ensuring you feel confident and stylish every day. From chic casual wear to statement pieces, we bring the runway to your wardrobe. Join us on a journey where every outfit tells a story, and every look makes you feel like the star you are.
          </p>
        </div>

      </div>
    </div>
  );
};
