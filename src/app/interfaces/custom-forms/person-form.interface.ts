export interface PersonForm {
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
}

export interface AccountProfileForm extends PersonForm {
  accNum: string;
  surname: string;
  mobileNumber: string;
  company: string;
}
