import Beige_Linen_Jacket2 from '../assets/images/Beige-Linen-Jacket-Pants2.webp'; 
import Beige_Linen_Jacket from '../assets/images/Beige-Linen-Jacket-Pants.webp';
import Beige_Linen_Jacket3 from "../assets/images/Beige-Linen-Jacket-Pants3.webp";

import saffron_set from '../assets/images/saffron-satin-set.webp'; 
import saffron_set2 from '../assets/images/saffron-satin-set2.webp'; 

import navy_satin_dress from '../assets/images/navy-satin-dress.webp';  
import navy_satin_dress2 from '../assets/images/navy-satin-dress2.webp'; 
import navy_satin_dress3 from '../assets/images/navy-satin-dress3.webp'; 

import White_cotton_set from "../assets/images/White-cotton-set.webp";
import White_cotton_set2 from "../assets/images/White-cotton-set2.webp";
import White_cotton_set3 from "../assets/images/White-cotton-set3.webp";
import { m } from 'framer-motion';

export const products = [
  { 
    id: 1, 
    name: "Beige Linen Set", 
    price: 60, 
    jacketPrice: 40,
    pantsPrice: 20,
    jacketCode : "3001/021/064",
    pantsCode : "4001/021/064",
    image: [Beige_Linen_Jacket , Beige_Linen_Jacket2 , Beige_Linen_Jacket3],
    category: ["set", "jacket", "pants"],  
    gender: "women",
    color: ["beige"],
    material: "75% cotton, 25% wool", 
    Cleaning: `
      Washing: Prefer hand wash or wool cycle (cold)
      Bleach: Do not bleach
      Drying: Do not tumble dry / lay flat to dry
      Ironing: Low heat with steam
      Note: Dry cleaning is recommended to maintain shape
    ` 
  },

  { 
    id: 2, 
    name: "Saffron Satin Set", 
    price: 55,
    jacketPrice: 30,
    pantsPrice: 25,
    jacketCode : "2001/027/044" , 
    pantsCode : "4001/027/044" , 
    image: [saffron_set , saffron_set2],
    category: ["set" , "jacket" , "pants"],  
    gender: "women",
    color: ["saffron"],
    material: "60% cotton, 40% polyester",
    Cleaning: ` 
      Washing: 30°C (gentle cycle)
      Bleach: Do not bleach
      Drying: Prefer not to use tumble dryer / hang to dry
      Ironing: Medium heat (up to 150°C)
      Note: Turn inside out before washing
    `
  },

  { 
    id: 3, 
    name: "Navy Satin Dress", 
    price: 40, 
    dressCode : "1001/027/054" , 
    image: [navy_satin_dress , navy_satin_dress2 , navy_satin_dress3],
    category: ["dress"], 
    gender: "women",
    color: ["navy"],
    material: "75% cotton, 25% polyester", 
    Cleaning: `
      Washing: 30°C (gentle cycle)
      Bleach: Do not bleach
      Drying: Air dry
      Ironing: Medium heat
      Note: Prefer ironing from the inside
    `
  },

  {
    id: 4 , 
    name : "White Cotton Set" ,
    price : 60 , 
    jacketPrice: 35,
    pantsPrice: 25,
    jacketCode : "1201/033/051" ,
    pantsCode : "8001/033/051" ,
    image : [White_cotton_set, White_cotton_set2 , White_cotton_set3], 
    category : ["set" , "jacket" , "pants"] ,  
    gender: "women",
    color: ["white"],
    material : "30% cotton, 70% polyester", 
    Cleaning : `
      Washing: 40°C
      Bleach: Allowed with caution (since it’s white)
      Drying: Tumble dry on low heat
      Ironing: Low heat (up to 110°C)
      Note: Prefer to wash separately from colors
    `
  }
];

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => 
    Array.isArray(product.category) 
      ? product.category.includes(category)
      : product.category === category
  );
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};