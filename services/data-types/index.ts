export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BankTypes {
  _id: string;
  name: string;
  ownerName: string;
  accountNumber: string;
}
export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BankTypes[];
}

export interface NominalTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  avatar: string;
  email: string;
  id: string;
  name: string;
  phoneNumber: string;
  username: string;
}

export interface JWTPayloadTypes {
  player: UserTypes;
  iat: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  userAccount: string;
}

export interface VoucherTopUpHistoryTypes {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: number;
  thumbnail: string;
}

export interface UserHistoryTypes {
  name: string;
  phoneNumber: number;
}

export interface PaymentHistoryTypes {
  accountNumber: string;
  bankName: string;
  name: string;
  type: string;
}
export interface TransactionHistoryTypes {
  _id: string;
  voucherTopupHistory: VoucherTopUpHistoryTypes;
  userHistory: UserHistoryTypes;
  name: string;
  paymentHistory: PaymentHistoryTypes;
  player: string;
  status: string;
  tax: number;
  user: string;
  userAccount: string;
  value: number;
}

export interface TopUpCategoryTypes {
  _id: string;
  name: string;
  value: number;
}
