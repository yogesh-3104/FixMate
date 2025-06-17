import Service from "../models/serviceModel.js";
export const createService = async (req, res) => {
  const { category, description, price, location } = req.body;
  const providerId = req.user.id;
  try {
    const newService = await Service.create({
      category,
      description,
      providerId,
      price,
      location,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.log("Error while creating Service : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllServices = async (req, res) => {
  try {
    const service = await Service.find();
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log("Error while fetching all Service : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getService = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log("Error while fetching Service : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getProviderServices = async (req, res) => {
  try {
    console.log("From Provider Service");

    const providerId = req.user._id;
    console.log("Provider ID:", providerId);
    console.log("User object:", req.user);

    const services = await Service.find({ providerId });
    console.log("Found services:", services);

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this provider" });
    }
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in get provider services:", error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { category, description, price, location } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { category, description, price, location },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.log("Error while updating service : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted successfully" });
  }catch (error) {
    console.log("Error while deleting service : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
