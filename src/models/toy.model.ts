export interface ToyModel {
  toyId: string;
  name: string;
  description: string;
  type: { name: string };   
  stock: number;   
  ageGroup: { name: string };
  targetGroup: string;
  productionDate: string; 
  category: string;
  price: number;
  imageUrl?: string;
  
  destination: string;  
  ratings?: { userId: string; value: number; createdAt: string }[];
  userReviews?: { userId: string; reviewerName: string; comment: string; createdAt: string }[];
  reviews: string;
}


