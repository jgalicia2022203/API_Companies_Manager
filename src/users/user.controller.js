import bcryptjs from "bcryptjs";
import Excel from "excel4node";
import Company from "../companies/company.model.js";
import User from "./user.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const companiesGet = async (req, res = response) => {
  const { limit, from } = req.query;
  const query = { status: true };

  const [total, companies] = await Promise.all([
    Company.countDocuments(query),
    Company.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    companies,
  });
};

export const createCompany = async (req, res) => {
  const { name, trajectory, impact, category } = req.body;

  try {
    const company = new Company({
      name,
      trajectory,
      impact,
      category,
    });
    await company.save();

    res.status(201).json({ msg: "Company created successfully", company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const editCompany = async (req, res) => {
  const companyId = req.params.id;
  const { name, trajectory, impact, category } = req.body;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    company.name = name;
    company.trajectory = trajectory;
    company.impact = impact;
    company.category = category;

    await company.save();

    res.status(200).json({ msg: "Company updated successfully", company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const reportExcel = async (req, res) => {
  try {
    const query = { status: true };

    const companies = await Company.find(query);

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Companies COPEREX");

    const headers = ["Company Name", "Trajectory", "Impact Level", "Category"];
    headers.forEach((header, index) => {
      worksheet.cell(1, index + 1).string(header);
    });

    companies.forEach((company, index) => {
      worksheet.cell(index + 2, 1).string(company.name);
      worksheet.cell(index + 2, 2).string(company.trajectory);
      worksheet.cell(index + 2, 3).string(company.impact);
      worksheet.cell(index + 2, 4).string(company.category);
    });

    const excelBuffer = await workbook.writeToBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=COPEREX_interfer.xlsx"
    );

    res.send(excelBuffer);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "The excel could not be generated",
    });
  }
};
