declare module "@luxuryescapes/lib-global" {
  interface PackageNightOption {
    packageId: string;
    extraNights: number;
    roomTypeId: string;
    roomRateId: string;
    name: string;
    duration: number;
    prices: Array<{
      currency_code: string;
      price: number;
      value: number;
      nightly_price: number;
      nightly_value: number;
    }>;
  }

  interface TaxesAndFees {
    name: string;
    unit: "percentage" | "amount";
    type: "night" | "stay";
    per_person: boolean;
    value: number;
  }
  
  interface Occupants {
    adults: number;
    children?: number;
    infants?: number;
    childrenAge?: Array<number>;
  }

  export type LeHotelOfferType =
    | "hotel"
    | "last_minute_hotel"
    | "tactical_ao_hotel"

  const offer: {
    constants: {
      OFFER_TYPE_HOTEL: 'hotel';
      OFFER_TYPE_TOUR: 'tour';
      OFFER_TYPE_LAST_MINUTE_HOTEL: 'last_minute_hotel';
      OFFER_TYPE_TACTICAL_AO_HOTEL: 'tactical_ao_hotel';
      LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT: number;
    };
    dates: {
      checkInCloses: (
        offerType: LeHotelOfferType,
        travelToDate: string | null,
        numberOfNights: number,
        timezoneOffset: number,
        checkInLimit?: number
      ) => string
    };
    flexibleNights: {
      generateAllOptions: (pkg: any) => Array<PackageNightOption>;
    };
    duration: {
      getCounts: (packages: Array<object>, field: string) => Array<number>;
      getCountsString: (packages: Array<object>, field: string) => string;
      getFromPackages: (packages: Array<object>, offerType: string, holidayTypes: Array<string>) => string;
    };
    pricing: {
      calculateTaxAmount: ({ total, taxesAndFees, nights, occupancies }: { total: number, taxesAndFees: TaxesAndFees[], nights: number, occupancies?: Occupants[] }) => number;
    };
  };
  const occupancy: {
    get: (occupancy: string | string[]) => Occupants[];
    parse: (occupancy: string) => Occupants;
    match: (occupancy: string) => boolean;
    toString: (occupancy: Occupants) => string;
  };
  const currency: {
    addDollarType: (
      formattedAmount: string,
      currencyCode: string
    ) => string
  };
  const vendor: {
    requiresTravellerDetails: (vendorId: string) => boolean;
  };
  const flights: {
    ALLOWED_DESTINATIONS: Array<{ code: string, name: string }>;
    ALLOWED_DESTINATION_CODES: Array<string>;
    ALLOWED_DESTINATION_NAMES: Array<string>;
  };
}
