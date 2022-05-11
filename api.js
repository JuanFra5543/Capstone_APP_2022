const api = "http://172.31.144.212:5000/api/";
// const api = "http://192.168.3.10:5000/api/";

export const getTasks = async () => {
    const res = await fetch(api, {
      method: "GET",
    });
  
    return await res.json();
  };

export const authentication = async (user) => {
  const res = await fetch(api + "auth/loginClient", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return await res.json();
};

export const createUser = async (user) => {
  const res = await fetch(api + "user", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return await res.json();
};

export const getUser = async (id,token) => {
  const res = await fetch(api + "user/" + id, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token }
  });
  return await res.json();
};

export const editUser = async (id,token,user) => {
  const res = await fetch(api + "user/app/" + id, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
    body: JSON.stringify(user)
  });
  return await res.json();
};

export const getProduct = async (code,token) => {
  const res = await fetch(api + "stock/client/" + code, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
  });
  return await res.json();
};

export const getClients = async (id,token) => {
  const res = await fetch(api + "client/" + id, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
  });
  return await res.json();
};
