import Company from "../companies/company.model.js";
import User from "../users/user.model.js";

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
