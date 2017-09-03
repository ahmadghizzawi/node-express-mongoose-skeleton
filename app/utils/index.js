/**
 * Test
 * @param res
 * @param obj
 * @param status
 */
function respond(res, obj, status) {
  res.format({
    json() {
      if (status) {
        return res.status(status).json(obj);
      }
      return res.json(obj);
    },
  });
}

module.exports = {
  respond,
};
