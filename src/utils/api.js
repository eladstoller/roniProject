let headersList = {
  "Content-Type": "application/json",
};
export const getPredictedPrice = (payload) => {
  return fetch(
    `https://1mwuf0aj60.execute-api.us-east-1.amazonaws.com/dev-env`,
    {
      method: "POST",
      body: JSON.stringify({ data: payload }),
      headers: headersList,
    }
  );
};
