export const fetchQuizData = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.jsonserve.com/Uw5CrX`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw new Error(`Failed to fetch quiz data: ${error.message}`);
  }
};
