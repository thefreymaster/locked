export interface ILock {
  author: string;
  createdDate: string;
  imageUrl: string;
  location: {
    lat: number;
    long: number;
  };
  name: string;
  ratings: { illumination: 1; quality: 5; safety: 2 };
  recommended: false;
  size: string;
  traffic: string;
  notes?: string;
  imageUrlAbsolute?: string;
}
