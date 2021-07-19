declare module "@luxuryescapes/lib-global" {
  interface PackageNightOption {
    packageId: string;
    extraNights: number;
    roomTypeId: string;
    roomRateId: string;
    name: string;
    duration: number;
    prices: {
      price: number;
      value: number;
      nightly_price: number;
      nightly_value: number;
    };
  }

  const offer: {
    flexibleNights: {
      generateAllOptions: (pkg: any) => Array<PackageNightOption>;
    };
  };
}
