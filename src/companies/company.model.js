import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The company name is obligatory"],
  },

  trajectory: {
    type: String,
    required: [true, "trajectory is obligatory"],
  },

  impact: {
    type: String,
    required: [true, "impact level is obligatory"],
  },

  category: {
    type: String,
    required: [true, "category is obligatory"],
  },

  status: {
    type: Boolean,
    default: true,
  },
});

companySchema.methods.toJson = function () {
  const { __v, _id, ...company } = this.toObject();
  company.uid = _id;
  return company;
};

export default mongoose.model("company", companySchema);
