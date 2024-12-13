import Booking from '../../../../_models/booking.model';
import { Destination } from '../../../../_models/destination.model';
import { Flight } from '../../../../_models/flight.model';

export interface BookingItem {
  booking: Booking;
  details: {
    flight: Flight;
    origin: Destination;
    destination: Destination;
  };
}
