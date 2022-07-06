const api = "https://storetg-api.herokuapp.com/api/";
export const stripeKey = 'pk_test_51KxvwmL0mNx5gOqGgY6N9DtzurxYyvVS7qGUdRU76pRBnW5WUvrUO5nJzPIqNSYoQsfpCBM85I41GwNIfXk5V4dQ00YXwySM4l'

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

export const createClient = async (token,client) => {
  const response = await fetch(api + 'client/', {
    method: 'POST',
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
    body: JSON.stringify(client)
  });
  const clientSecret = await response.json();
  return clientSecret
};

export const createReceipt = async (token,payload) => {
  const response = await fetch(api + 'receipt/', {
    method: 'POST',
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
    body: JSON.stringify(payload)
  });
  return await response.json();
};

export const getReceipts = async (token,id) => {
  const response = await fetch(api + `receipt/client/${id}`, {
    method: 'GET',
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
  });
  return await response.json();
};

export const fetchPaymentSheetParams = async (stripeId, total , token) => {
  const response = await fetch(api + 'receipt/payment-intent', {
    method: 'POST',
    headers: { Accept: "application/json", "Content-Type": "application/json", "x-access-token" : token },
    body: JSON.stringify({
      total:total,
      stripeId: stripeId,
      paymentMethodType:'card',
      currency:'usd',
    })
  });
  const clientSecret = await response.json();
  return clientSecret
};