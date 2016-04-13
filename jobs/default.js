module.exports = function() {
  return new Promise(function(fulfill, reject) {
    fulfill({
      hello: {text: "world"},
      number: {number: 2}
    });
  });
};
