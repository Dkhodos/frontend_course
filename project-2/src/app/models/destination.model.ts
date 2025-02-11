export interface DestinationFirestoreData {
  code: string;
  name: string;
  airportName: string;
  airportUrl: string;
  imageUrl: string;
  email: string;
}

export class Destination {
  constructor(
    public code: string,
    public name: string,
    public airportName: string,
    public airportUrl: string,
    public imageUrl: string,
    public email: string
  ) {}

  static fromFirestore(data: DestinationFirestoreData): Destination {
    return new Destination(
      data.code,
      data.name,
      data.airportName,
      data.airportUrl,
      data.imageUrl,
      data.email
    );
  }

  toFirestore(): DestinationFirestoreData {
    return {
      code: this.code,
      name: this.name,
      airportName: this.airportName,
      airportUrl: this.airportUrl,
      imageUrl: this.imageUrl,
      email: this.email,
    };
  }
}
