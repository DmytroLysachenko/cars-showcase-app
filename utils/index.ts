import { manufacturers, fuels } from './../constants/index';
import { CarProps, ParamsProps } from '@/types';
import axios from 'axios';

const ninjasCarsAPI = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: { 'X-Api-Key': 'j+u2pAM/KQVYucnaLhZf9g==sn0mczpF7HMSVQQJ' },
});

export async function fetchCars(params: ParamsProps) {
  try {
    const { manufacturer: make, year, model, limit, fuel: fuel_type } = params;
    const { data } = await ninjasCarsAPI.get('/cars', {
      params: {
        make,
        year,
        model,
        limit,
        fuel_type,
      },
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

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};
