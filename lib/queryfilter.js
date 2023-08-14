const handleFiltering = (req) => {
  let filters = { ...req.query };
  // sort, page , limit => exclude
  const excludeFields = ["sort", "page", "limit", "populate", "fields"];
  excludeFields.forEach((field) => delete filters[field]);
  let filterString = JSON.stringify(filters);
  filterString = filterString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  filters = JSON.parse(filterString);
  const queries = {};
  if (req.query.populate) {
    const populate = req.query.populate.split(",").join(" ");
    queries.populate = populate;
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queries.fields = fields;
  }
  if (req.query.sort) {
    const sortby = req.query.sort.split(",").join(" ");
    queries.sort = sortby;
  }
  if (req.query.page || req.query.limit) {
    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * parseInt(limit);
    queries.skip = skip;
    queries.limit = limit;
  }
  return {
    filters,
    queries,
  };
};
module.exports = handleFiltering;
