export interface Socials {

  linkedIn: string;
  gmail: string;
  twitter: string;
  faceBook: string;
  webSite?: string;
  instagram?: string; 

}

export interface Contact {
    profilePhoto?: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    emailAddresses: string[];
    bio: string;
    dial: string;
    meeting: string;
    phoneNumbers: string[];
    social?: Socials;
  }


export interface SearchContact {
  name: string;
  email: string;
  phone: string;
}