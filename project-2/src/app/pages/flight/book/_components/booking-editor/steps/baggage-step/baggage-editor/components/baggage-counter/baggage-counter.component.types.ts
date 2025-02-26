import { Baggage } from '../../../../../../../../../../models/passenger.model';

export interface BaggageDescription {
  dimensions: string;
  weight: string;
  price: number;
  usage: string;
  icon: string;
}

export interface SingleBaggageSummary {
  items: Baggage[];
  itemsExplain: string
  price: number;
  passengerName: string;
  passportNumber: string;
}
