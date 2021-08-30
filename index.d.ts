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

  export type LeHotelOfferType =
    | "hotel"
    | "last_minute_hotel"
    | "tactical_ao_hotel"

  const offer: {
    dates: {
      checkInCloses: (
        offerType: LeHotelOfferType,
        travelToDate: string | null,
        numberOfNights: number,
        timezoneOffset: number,
        checkInLimit?: number
      ) => string
    },
    flexibleNights: {
      generateAllOptions: (pkg: any) => Array<PackageNightOption>;
    };
  };
  const currency: {
    addDollarType: (
      formattedAmount: string,
      currencyCode: string
    ) => string
  };
}
