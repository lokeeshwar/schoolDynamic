const enrollData = require('../models/enrollMoedel')
const errorHandler = require("../utils/error");


const deleteEnrolle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to delete this enrolle"));
  }
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete"));
  }
  try {
    await enrollData.findByIdAndDelete(req.params.userId);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

const getEnrolles = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    // Additional code for filtering by batch if needed
    const batchFilter = req.query.batch ? { batch: req.query.batch } : {};

    const AllEnrolls = await enrollData
      .find(batchFilter)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);


    const totalEnrolls = await enrollData.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await enrollData.countDocuments({
      createdAt: { $gte: oneMonthAgo },
      ...batchFilter, // Include batch filter for last month count as well
    });

    res.status(200).json({
      AllEnrolls,
      totalEnrolls,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteEnrolle, getEnrolles };
