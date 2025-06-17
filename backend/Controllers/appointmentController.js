import Appointment from "../models/appointmentModel.js";
import Service from "../models/serviceModel.js";

const createAppointment = async (req, res) => {
  const { serviceId, providerId, date } = req.body;
  try {
    const existingAppointment = await Appointment.findOne({
      customerId: req.user._id,
      serviceId,
      providerId,
      status: { $in: ["pending", "accepted"] },
    });
    if (existingAppointment) {
      console.log("appo");
      return res
        .status(400)
        .json({
          message: "You already have an active appointment for this service.",
          existingAppointment,
        });
    }
    const newAppointment = await Appointment.create({
      customerId: req.user._id,
      serviceId,
      providerId,
      status: "pending",
      date,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.log("Error while Creating Appointment : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAppointment = async (req, res) => {
  const providerId = req.user.id;
  console.log(providerId);

  try {
    const services = await Service.find({ providerId });
    const serviceIds = services.map((service) => service._id);

    const appointment = await Appointment.find({
      serviceId: { $in: serviceIds },
    })
      .populate("customerId", "name email phone location")
      .populate("serviceId", "category description price")
      .sort({ createdAt: -1 });
    console.log(appointment);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.log("Error while fetching Appointment : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { customerId, serviceId, status, date } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { customerId, serviceId, status, date },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log("Error while Updating Appointment : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.log("Error while Deleting Appointment : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getMyAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ customerId: req.user._id })
      .populate("serviceId")
      .populate("providerId", "name email location")
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching My appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};
const getProviderAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ providerId: req.user._id })
      .populate("serviceId", " category price location")
      .populate("customerId", "name email phone location")
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching provider appointments:", error);
    res.status(500).json({ message: "Failed to fetch provider appointments" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log("Error while updating appointment status: ", error.message);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};
export { createAppointment,getAppointment,getMyAppointment,getProviderAppointment,updateAppointment,deleteAppointment };
