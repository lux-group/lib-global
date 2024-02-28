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
      lux_plus_price: number;
      value: number;
      nightly_price: number;
      lux_plus_nightly_price: number;
      nightly_value: number;
    }>;
  }

  interface TaxesAndFees {
    name: string;
    unit: "percentage" | "amount";
    type: "night" | "stay";
    per_person: boolean;
    value: number;
    payable_at_property?: boolean;
    currency?: string;
    additional_tax?: boolean;
    excl_flash_at_property?: boolean;
    product_type?: "all" | "dynamic" | "limited_time_exclusive"
  }

  interface TaxBreakdown {
    name: string;
    dynamic_tax: boolean;
    unit: string;
    additional_tax: boolean;
    duration_type: string;
    value: number;
    currency?: string;
    per_person: boolean;
    sell: number;
    sell_currency: string;
  }

  interface Occupants {
    adults: number;
    children?: number;
    infants?: number;
    childrenAge?: Array<number>;
  }

  interface RoomIncludedGuests {
    adults: number;
    children: number;
    infants: number;
  }

  interface RoomExtraGuestSurcharge {
    adult_amount: number;
    adult_cost?: number;
    child_amount: number;
    child_cost?: number;
    infant_amount: number;
    infant_cost?: number;
    currency?: string;
  }

  interface ExtraGuestSurcharge {
    sell: number;
    cost: number;
    applies: boolean;
    costCurrency?: string,
    duration: {
      sell: number;
      cost: number;
      applies: boolean;
    },
  }

  interface JSONSchema {
    type: "string";
  }

  interface TaxesAndFeesWithTotal extends TaxesAndFees {
    total: number;
  }

  export type LeHotelOfferType =
    | "hotel"
    | "last_minute_hotel"
    | "tactical_ao_hotel"
    | "bundle_and_save"
    | "rental"

  const offer: {
    constants: {
      OFFER_TYPE_HOTEL: 'hotel';
      OFFER_TYPE_TOUR: 'tour';
      OFFER_TYPE_LAST_MINUTE_HOTEL: 'last_minute_hotel';
      OFFER_TYPE_TACTICAL_AO_HOTEL: 'tactical_ao_hotel';
      OFFER_TYPE_BUNDLE_AND_SAVE: 'bundle_and_save';
      OFFER_TYPE_RENTAL: 'rental';
      LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT: number;
      STATUS_CONTENT_APPROVED: 'content-approved';
      STATUS_AD_FEED_ONLY: 'ad-feed-only';
      STATUS_HIDDEN: 'hidden';
      STATUS_DRAFT: 'draft';
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
      calculateTaxAmount: ({ total, taxesAndFees, nights, occupancies, isFlash }: { total: number, taxesAndFees: TaxesAndFees[], nights: number, occupancies?: Occupants[], isFlash?: boolean }) => {taxesAndFees: number, propertyFees: number};
      calculateAmountForEachTax: ({ total, taxesAndFees, nights, occupancies }: { total: number, taxesAndFees: TaxesAndFees[], nights: number, occupancies?: Occupants[] }) => Array<TaxesAndFeesWithTotal>;
      calculateAmountForEachPropertyFee: ({ total, taxesAndFees, nights, occupancies }: { total: number, taxesAndFees: TaxesAndFees[], nights: number, occupancies?: Occupants[] }) => Array<TaxesAndFeesWithTotal>;
      calculateTaxBreakdownForEachTax: ({ total, taxesAndFees, nights, occupancies }: { total: number, taxesAndFees: TaxesAndFees[], nights: number, occupancies?: Occupants[] }) => Array<TaxBreakdown>;
    };
    patchBundleOffer: (offer: any) => void;
  };
  const occupancy: {
    get: (occupancy: string | string[]) => Occupants[];
    parse: (occupancy: string) => Occupants;
    match: (occupancy: string) => boolean;
    toString: (occupancy: Occupants) => string;
    countOccupants: ({ occupancy, maxChildAge, maxInfantAge }: { occupancy: Occupants, maxChildAge?: number, maxInfantAge?: number }) => Occupants;
    strummerMatcher: { match: <V>(path?: string, value?: V) => string | undefined, toJSONSchema: () => JSONSchema };
    strummerMatcherRequired: { match: <V>(path?: string, value?: V) => string | undefined, toJSONSchema: () => JSONSchema };
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
  const date: {
    format: (
      date: Date,
      mask: string
    ) => string;
    formatYYYYMMDD: (
      date: Date
    ) => string;
    convertTZ: (
      date: Date,
      tzString: string
    ) => Date;
    addDays: (
      date: Date,
      days: number
    ) => Date;
    subDays: (
      date: Date,
      days: number
    ) => Date;
    diffInDays: (
      date1: Date,
      date2: Date
    ) => number;
    calculateTimezoneOffset: (
      date1: Date,
      date2: Date
    ) => number;
    getDays: (
      floorDate: Date,
      ceilingDate: Date,
      including?: boolean
    ) => Date[];
  };
  const calendar: {
    constants: {
      CEILING_YEARS: number;
      DEFAULT_MONTHS_FALLBACK: number;
      DATE_FORMAT: string;
      OFFERS: {
        [offerType: string]: {
          type: string;
          parentType: string;
          dateFloorOffset: number;
          hourOfDayThreshold: number;
          useDynamicRate: boolean;
          useTimezoneOffset: boolean;
          isSupported: boolean;
        };
      };
    };
    getTimezoneOffset: (
      offerPackageTimezoneOffset: number,
      offerType: string,
      requestTimezoneOffset: number
    ) => number;
    getMonthsToRequest: (
      timezoneOffset: number,
      maxDate: string
    ) => number;
    getMaxCheckInCloseDate: (
      checkInCloses?: string | null,
      defaultMonths?: number
    ) => string;
    getStartDate: (
      minDate?: string | null,
      travelFromDate?: string | null
    ) => string;
    getDateFloorOffset: (
      timezoneOffset: number,
      offerType: string,
      enquiryType: 'customer' | 'admin'
    ) => string;
  };
  export type PropertyType = 'HOTEL' | 'UNIQUE_STAYS' | 'RENTAL';
  const property: {
    isUniqueStay: (categoryName: string) => boolean;
    allTypesAndCategories: {[type: string]: string};
    allCategories: Array<string>;
    allSubCategories: Array<string>;
    allTypes: Array<PropertyType>;
    HOTEL_TYPE: string;
    UNIQUE_STAYS_TYPE: string;
    RENTAL_TYPE: string;
    CASTLE: string;
    PALACE: string;
    INN: string;
    BEDBREAKFAST: string;
    GUESTHOUSE: string;
    LODGE: string;
    RYOKAN: string;
    TREEHOUSE: string;
    APARTHOTEL: string;
    COUNTRYHOUSE: string;
    AGRITOURISM: string;
    ALLINCLUSIVE: string;
    RIAD: string;
    CABIN: string;
    CHALET: string;
    COTTAGE: string;
    VILLA: string;
    APARTMENT: string;
    PRIVATEVACATIONHOME: string;
    HOUSEBOAT: string;
    CONDOMINIUMRESORT: string;
    CAMPSITE: string;
    ULTRA_LUX: string;
    HOTELSRESORTS: string;
    extraGuests: {
      get: ({ adults, children, infants, includedGuests }: { adults: number, children: number, infants: number, includedGuests: RoomIncludedGuests[] }) => RoomIncludedGuests[];
      surcharges: ({ nights, extraGuests, extraGuestSurcharge }: { nights: number, extraGuests: RoomIncludedGuests[][], extraGuestSurcharge?: RoomExtraGuestSurcharge }) => ExtraGuestSurcharge;
    }
  };
  const product: {
    constants: {
      PRODUCT_ALL: "all",
      PRODUCT_DYNAMIC: "dynamic",
      PRODUCT_LTE: "limited_time_exclusive",
    };
  }
  const environment: {
    DEVELOPMENT: 'development',
    SPEC: 'spec',
    TEST: 'test',
    PRODUCTION: 'production',
    PERFORMANCE: 'performance',
  }
  const whiteLabel: {
    dynamicTags: {
      replaceTagsMiddleware: (allowedFields: string[]) => ((req: Request, res: Response, next: () => any) => void)
      replaceTags: <T>(object: T, brand?: string, allowedFields?: string[], isRetainingTags?: boolean) => T
      brandContent: {
          [key: string]: {
            BrandName: string;
            SalesEmail: string;
            CruiseEmail: string;
            TourEmail: string;
            TrustedPartnerTourEmail: string;
            FlightPolicyLink: string;
        }
      }
    }
  }
}
