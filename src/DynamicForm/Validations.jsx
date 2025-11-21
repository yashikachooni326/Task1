
export const validateName = (fname) => {
  if (!fname) return "First name is required";
  if (fname.length < 3) return "First name must be at least 3 characters";
  return "";
};


export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email format";
  return "";
};

export const validateFood = (hobby) => {
  if (!hobby || hobby.length === 0) return "At least 1 hobby required";
  return "";
};



export const validateCity = (city) => {
  if (!city) return "City is required";
  return "";
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  if (phone.length < 10) return "Phone must be 10 digits";
  return "";
};

export const validateDescription = (desc) => {
  if (!desc || desc.trim() === "") return "Description is required";
  if (desc.length < 10) return "Description too short";
  return "";
};
