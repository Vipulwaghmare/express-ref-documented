const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    const page_size = parseInt(req.query.page_size);
    const current_page = parseInt(req.query.current_page);

    const startIndex = (current_page - 1) * page_size;
    const endIndex = page * limit;

    const result = {};

    const lenghtOfData = await model.countDocuments().exec();
    if (endIndex < lenghtOfData) {
      result.next = {
        page_size,
        current_page: current_page + 1,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page_size,
        current_page: current_page - 1,
      };
    }
    try {
      result.results = await model
        .find()
        .limit(page_size)
        .skip(startIndex)
        .exec();
      res.paginationResult = result;
      next();
    } catch (error) {
      res.status(500).json({
        error: "Failed to get the data",
      });
    }
  };
};

module.exports = paginationMiddleware;
