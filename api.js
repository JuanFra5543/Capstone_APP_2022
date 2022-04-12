const api = "url API";

export const getTasks = async () => {
    const res = await fetch(api, {
      method: "GET",
    });
  
    return await res.json();
  };

export const authentication = async (user) => {
  const res = await fetch(api + "auth/login", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return await res.json();
};
