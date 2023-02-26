const defaults = {
  port: 4000,
  maxItemsPerPage: 50,
};

const port = process.env.PORT || defaults.port;
const maxItemsPerPage =
  process.env.MAX_ITEMS_PER_PAGE || defaults.maxItemsPerPage;

module.exports = {
  port,
  maxItemsPerPage,
};
