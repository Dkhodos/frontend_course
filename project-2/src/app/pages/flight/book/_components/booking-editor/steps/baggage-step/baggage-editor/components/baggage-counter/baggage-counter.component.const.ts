import { Baggage } from '../../../../../../../../../../models/passenger.model';
import { BaggageDescription } from './baggage-counter.component.types';

export const BAGGAGE_TYPE_TO_DESCRIPTION: Record<Baggage, BaggageDescription> =
  {
    [Baggage.Small]: {
      dimensions: '40cm x 30cm x 20cm',
      weight: 'Max 7kg',
      price: 15,
      usage:
        'Ideal for personal items such as laptops, purses, or small backpacks.',
      icon: 'work',
    },
    [Baggage.Medium]: {
      dimensions: '55cm x 40cm x 25cm',
      weight: '10kg',
      price: 28,
      usage:
        'Suitable for carry-on luggage, including short trips or weekend travel.',
      icon: 'luggage',
    },
    [Baggage.Large]: {
      dimensions: '80cm x 50cm x 30cm',
      weight: '23kg',
      price: 40,
      usage: 'Ideal for checked baggage on long-haul flights.',
      icon: 'luggage',
    },
  };

export const BAGGAGE_TYPE_TO_CONTROL_KEY: Record<Baggage, string> = {
  [Baggage.Small]: 'small',
  [Baggage.Medium]: 'medium',
  [Baggage.Large]: 'large',
};

export const BAGGAGE_LIMIT_PER_PASSENGER = 3;
export const BAGGAGE_LIMIT_IN_TOTAL = 9;
