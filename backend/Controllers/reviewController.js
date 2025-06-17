import Appointment from '../models/appointmentModel.js';
import Review from '../models/reviewModel.js';

const createReview = async (req, res) => {
  const { appointmentId, providerId, rating, comment } = req.body;

  try {
    const customerId = req.user._id;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      customerId: customerId,
      providerId,
      status: "completed",
    });

    if (!appointment) {
      return res.status(403).json({ message: "Unauthorized to give feedback" });
    }

    // 2. Check if user has already reviewed this appointment
    const alreadyReviewed = await Review.findOne({
      appointmentId,
      customerId,
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this appointment." });
    }

    // 3. Create review
    const newReview = await Review.create({
      customerId,
      appointmentId,
      providerId,
      rating,
      comment,
    });

    if (!newReview) {
      return res.status(500).json({ message: "Review creation failed" });
    }

    res
      .status(201)
      .json({ message: "Reviewed successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getReview = async (req, res) => {
  const  customerId  = req.user._id;

  try {
    const reviews = await Review.find({customerId:customerId}).populate("providerId","name email");
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { customerId, serviceId, rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { customerId, serviceId, rating, comment }, { new: true });
    if(!updatedReview){
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.log("Error while updating Reviews for Provider: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}   

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if(!review){
      return res.status(404).json({ message: "Review not found" });
    }
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error while deleting Reviews for Provider: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}


const getProviderReviewAndRating=async(req,res)=>{
  try {
    const providerId=req.user._id;
    console.log(providerId);
    const reviews=await Review.find({providerId:providerId}).populate("customerId","name ");
    console.log(reviews);
  
    const sumOfRating= reviews.reduce((acc,review)=>{
      return acc+review.rating
    },0)
    const averageRating= sumOfRating/reviews.length;
    return res.status(200).json({averageRating,reviews})
  } catch (error) {
    console.log("Error while fetching Reviews for Provider: ",error.message);
    res.status(500).json({message:error.message});
  }
}
export { createReview, getReview,getProviderReviewAndRating, updateReview, deleteReview };



