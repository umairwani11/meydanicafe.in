import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingInquiry {
    id: bigint;
    checkIn: string;
    name: string;
    email: string;
    timestamp: Time;
    checkOut: string;
    guests: bigint;
    roomType: RoomType;
}
export type Time = bigint;
export enum RoomType {
    familySuite = "familySuite",
    deluxeRoom = "deluxeRoom",
    executiveSuite = "executiveSuite"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<BookingInquiry>>;
    submitBooking(name: string, email: string, checkIn: string, checkOut: string, roomType: RoomType, guests: bigint): Promise<BookingInquiry>;
}
