const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  /*
    * this solution works but the performance will be poor
    * bec all the artist records are loaded in the server @ ".then" method
  */
  // return Artist.find({})
  //   .sort({ yearsActive: 1 })
  //   .then((artists) => {
  //     return { min: artists[0].yearsActive, max: artists[artists.length - 1].yearsActive };
  //   });


  /*
    * this solution is better than the above solution in performance
  */
  function rangeQuery(sortValue) {
    return Artist
            .find({})
            .sort({ yearsActive: sortValue })
            .limit(1)
            .then(artists => artists[0].yearsActive);
  }

  const minValue = rangeQuery(1);
  const maxValue = rangeQuery(-1);

  return Promise.all([minValue, maxValue])
    .then((result) => {
      return { min: result[0], max: result[1] };
    });
};
