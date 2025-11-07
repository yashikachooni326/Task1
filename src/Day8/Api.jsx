
export const getData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data; 
  } catch (err) {
    console.log("Error occurred while data fetching:", err);
    throw err;
  }
};
