export interface ICabin {
  name: string;
}

export interface IGuest {
  email: string;
  fullName: string;
}

export interface IBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-out" | "checked-in";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: ICabin;
  guests: IGuest;
}
