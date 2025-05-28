// src/utils/api.ts
export const submitRequest = async (formData: any) => {
  try {
    const res = await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Submit request error:", error);
  }
};
