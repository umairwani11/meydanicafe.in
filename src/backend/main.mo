import List "mo:core/List";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type RoomType = {
    #deluxeRoom;
    #executiveSuite;
    #familySuite;
  };

  type BookingInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    checkIn : Text;
    checkOut : Text;
    roomType : RoomType;
    guests : Nat;
    timestamp : Time.Time;
  };

  module BookingInquiry {
    public func compareByTimestamp(a : BookingInquiry, b : BookingInquiry) : Order.Order {
      Nat.compare(a.id, b.id);

    };
  };

  var nextId = 0;
  let bookings = List.empty<BookingInquiry>();

  public shared ({ caller }) func submitBooking(
    name : Text,
    email : Text,
    checkIn : Text,
    checkOut : Text,
    roomType : RoomType,
    guests : Nat,
  ) : async BookingInquiry {
    let booking : BookingInquiry = {
      id = nextId;
      name;
      email;
      checkIn;
      checkOut;
      roomType;
      guests;
      timestamp = Time.now();
    };
    bookings.add(booking);
    nextId += 1;
    booking;
  };

  public query ({ caller }) func getAllBookings() : async [BookingInquiry] {
    bookings.values().toArray().sort(BookingInquiry.compareByTimestamp);
  };
};
