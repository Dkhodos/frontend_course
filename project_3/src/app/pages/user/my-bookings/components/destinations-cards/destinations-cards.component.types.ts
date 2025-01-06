import Booking from '../../../../../models/booking.model';
import { Flight } from '../../../../../models/flight.model';
import { Destination } from '../../../../../models/destination.model';

export interface BookingItem {
  booking: Booking;
  details: {
    flight: Flight;
    origin: Destination;
    destination: Destination;
  };
}
