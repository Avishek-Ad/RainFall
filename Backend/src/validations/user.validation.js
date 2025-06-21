import joiClean from "./wrapper.js";

const userSignupValidation = joiClean.object({
  fullName: joiClean.string().required(),
  email: joiClean.string().email().required(),
  password: joiClean.string().min(6).required(),
});

const userLoginValidation = joiClean.object({
  email: joiClean.string().email().required(),
  password: joiClean.string().min(6).required(),
});

const userOnboardingValidation = joiClean.object({
  fullName: joiClean.string().required(),
  bio: joiClean.string().required(),
  nativeLanguage: joiClean.string().required(),
  learningLanguage: joiClean.string().required(),
  location: joiClean.string().required(),
  profilePic: joiClean.string().required(),
});

export { userSignupValidation, userLoginValidation, userOnboardingValidation };
