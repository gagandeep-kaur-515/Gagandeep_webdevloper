const rentals = [
  {
    headline: "Cozy Apartment",
    city: "Toronto",
    province: "Ontario",
    numSleeps: 2,
    numBedrooms: 1,
    numBathrooms: 1,
    pricePerNight: 100.0,
    imageUrl: "/img/cozy-apartment.jpg",
    featuredRental: true,
  },
  {
    headline: "Luxury Villa",
    city: "Toronto",
    province: "Ontario",
    numSleeps: 6,
    numBedrooms: 3,
    numBathrooms: 3,
    pricePerNight: 800.0,
    imageUrl: "/img/luxury-villa.jpg",
    featuredRental: true,
  },
  {
    headline: "Beach House",
    city: "Toronto",
    province: "Ontario",
    numSleeps: 8,
    numBedrooms: 4,
    numBathrooms: 2,
    pricePerNight: 500.0,
    imageUrl: "/img/beach-house.jpg",
    featuredRental: true,
  },
  {
    headline: "Mountain Cabin",
    city: "Vaughan",
    province: "Ontario",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 300.0,
    imageUrl: "/img/mountain-cabin.jpg",
    featuredRental: false,
  },
  {
    headline: "City Loft",
    city: "Vaughan",
    province: "Ontario",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 200.0,
    imageUrl: "/img/city-loft.jpg",
    featuredRental: false,
  },
  {
    headline: "Modern Condo",
    city: "Vaughan",
    province: "Ontario",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 2,
    pricePerNight: 250.0,
    imageUrl: "/img/modern-condo.jpg",
    featuredRental: false,
  },
  {
    headline: "Rustic Farmhouse",
    city: "Toronto",
    province: "Ontario",
    numSleeps: 6,
    numBedrooms: 3,
    numBathrooms: 2,
    pricePerNight: 350.0,
    imageUrl: "/img/rustic-farmhouse.jpg",
    featuredRental: false,
  },
];

module.exports.getFeaturedRentals = function () {
  const filteredArr = [];
  rentals.forEach((item) => {
    if (item.featuredRental) {
      filteredArr.push(item);
    }
  });

  return filteredArr;
};

module.exports.getRentalsByCityAndProvince = function () {
  const distinctLocations = rentals.reduce((acc, rental) => {
    const { city, province } = rental;
    const location = `${city}, ${province}`;
    if (!acc[location]) {
      acc[location] = {
        cityProvince: location,
        rentals: [],
      };
    }
    acc[location].rentals.push(rental);
    return acc;
  }, {});

  return Object.values(distinctLocations);
};
