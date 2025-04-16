import axios from "axios";

// Ye function API se posts data laata hai
export const getPosts = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data; // API ka data return kar raha hai
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Error aaye toh empty array return karega
  }
};
