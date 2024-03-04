import Company from "../companies/company.model.js";
import User from "../users/user.model.js";

export const existsUsername_Login = async (username = "") => {
  const existingUsername = await User.findOne({ username });
  return !!existingUsername;
};

export const existEmail_Login = async (email = "") => {
  const existingEmail = await User.findOne({ email });
  return !!existingEmail;
};

export const existsUsername = async (username = "") => {
  const existsUsername = await User.findOne({ username });
  if (existsUsername) {
    throw new Error(`the username ${username} is already registered`);
  }
};

export const existsEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`the email ${email} is already registered`);
  }
};

export const existsUserById = async (id = "") => {
  const existsUser = await User.findOne({ id });
  if (existsUser) {
    throw new Error(`the user with the id ${id} doesn't exist`);
  }
};

export const existsCompanyById = async (id = "") => {
  const existsCompany = await Company.findOne({ id });
  if (existsCompany) {
    throw new Error(`the company with the id ${id} doesn't exist`);
  }
};
