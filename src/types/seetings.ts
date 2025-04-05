export interface ISettings {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  breakfastPrice: number;
}
export type BookingField =
  | "minBookingLength"
  | "maxBookingLength"
  | "maxGuestPerBooking"
  | "breakfastPrice";

export interface IUpdateSettings {
  field: BookingField;
  formattedValue: number;
}
