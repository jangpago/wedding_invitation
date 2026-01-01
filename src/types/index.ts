export interface Person {
  name: string;
  phone: string;
  relation: string;
}

export interface Parents {
  father: Person;
  mother: Person;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  holder: string;
}

export interface WeddingInfo {
  date: Date;
  time: string;
  venue: {
    name: string;
    hall: string;
    address: string;
    phone: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    transportation: {
      subway?: string;
      bus?: string;
      car?: string;
      etc?: string;
    };
  };
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface WeddingData {
  groom: {
    name: string;
    phone: string;
    parents: Parents;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
  bride: {
    name: string;
    phone: string;
    parents: Parents;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
  wedding: WeddingInfo;
  greeting: {
    title: string;
    message: string;
  };
  gallery: GalleryImage[];
  video?: {
    url: string;
    thumbnail?: string;
  };
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  passwordHash: string;
  createdAt: Date;
}

export interface GuestbookFormData {
  name: string;
  message: string;
  password: string;
}
