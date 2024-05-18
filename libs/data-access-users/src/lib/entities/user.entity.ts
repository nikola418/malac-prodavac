import { $Enums, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  addressName: string | null;
  addressLatitude: Decimal | null;
  addressLongitude: Decimal | null;
  phoneNumber: string | null;
  currency: $Enums.Currency;
  paymentMethod: $Enums.PaymentMethod;
  roles: $Enums.UserRole[];
  updatedAt: Date;
  createdAt: Date;
}
