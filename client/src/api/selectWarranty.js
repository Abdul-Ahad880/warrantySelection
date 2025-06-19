// src/api/submitWarranty.js
import axios from "axios";
const base = import.meta.env.VITE_BASE_URL;

export const submitSelectedWarranty = async (data) => {
  try {
    const response = await axios.post(`${base}/api/warranty`, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${base}/api/warranty/brands`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
  }
};

export const getModelCategories = async (brand) => {
  const response = await axios.get(`${base}/api/warranty/model-categories`, {
    params: { brand },
  });
  return response.data;
};

export const getEngineNotes = async (brand, modelCategory) => {
  const response = await axios.get(`${base}/api/warranty/engine-notes`, {
    params: { brand, modelCategory },
  });
  return response.data;
};

// export const getCodes = async (brand, modelCategory, engineNotes) => {
//   const response = await axios.get(`${base}/api/warranty/codes`, {
//     params: { brand, modelCategory, engineNotes },
//   });
//   return response.data;
// };
export const getCodes = async (brand, modelCategory, engineNotes) => {
  const response = await axios.get(`${base}/api/warranty/codes`, {
    params: { brand, modelCategory, engineNotes },
  });
  return response.data;
};

export const getSubsystems = async () => {
  try {
    const response = await axios.get(`${base}/api/Warranty/subsystems`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const getTierDiscount = async () => {
  try {
    const response = await axios.get(`${base}/api/tier`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getSystemByCode = async (code) => {
  try {
    const response = await axios.get(`${base}/api/system/code`, {
      params: { code },
    });
    return response.data.system; // assuming your backend returns { system: {...} }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const getSystemsByTier = async (tier) => {
  const response = await axios.get(`${base}/api/system`, {
    params: { tier },
  });
  return response.data; // includes { systems: [...] }
};
