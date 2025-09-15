export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type CreateCategoryParams = {
    name: string
}

export type CreateEventParams = {
  event: {
    title: string;
    description?: string;
    location?: string;
    createdAt?: Date;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    categoryId: string;  
  };
  userId: string;
  path: string;
};
