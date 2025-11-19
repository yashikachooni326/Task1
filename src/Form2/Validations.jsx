export const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
};
 
export const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email format";
    return "";
};
 
export const validateGender = (gender) => {
    if (!gender) return "Gender is required";
    return "";
};
 
export const validateSkills = (skills) => {
    if (!skills || skills.length === 0) return "At least 1 skill required";
    return "";
};
 
export const validateDate = (date) => {
    if (!date) return "Date is required";
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
 