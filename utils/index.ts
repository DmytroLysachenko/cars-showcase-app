import axios from 'axios';

const ninjasCarsAPI = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: { 'X-Api-Key': 'j+u2pAM/KQVYucnaLhZf9g==sn0mczpF7HMSVQQJ' },
});

export async function fetchCars(model: string, limit: number = 5) {
  try {
    const { data } = await ninjasCarsAPI.get('/cars', {
      params: { model, limit },
    });
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
