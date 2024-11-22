// export enum MaritalStatus {
//     Married,
//     Single
// }

// export enum YesNoFlag {
//     Yes,
//     No,
// }

// export enum StoreRegion {
//     North,
//     South,
//     East,
//     West
// }

// export enum Homeowner {
//     Homeowner,
//     Renter,
// }

// export enum BrandType {
//     Private,
//     National,
// }

// export enum Department {
//     Food,
//     NonFood,
// }
export const MaritalStatusEnum = {
    Married: 'Married',
    Single: 'Single'
} as const;
export type MaritalStatus = keyof typeof MaritalStatusEnum;

export const YesNoFlagEnum = {
    Yes: 'Yes',
    No: 'No'
} as const;
export type YesNoFlag = keyof typeof YesNoFlagEnum;

export const StoreRegionEnum = {
    North: 'North',
    South: 'South',
    East: 'East',
    West: 'West'
} as const;
export type StoreRegion = keyof typeof StoreRegionEnum;

export const HomeownerEnum = {
    Homeowner: 'Homeowner',
    Renter: 'Renter'
} as const;
export type Homeowner = keyof typeof HomeownerEnum;

export const BrandTypeEnum = {
    Private: 'Private',
    National: 'National'
} as const;
export type BrandType = keyof typeof BrandTypeEnum;

export const DepartmentEnum = {
    Food: 'Food',
    NonFood: 'NonFood'
} as const;
export type Department = keyof typeof DepartmentEnum;

export interface Household {
    key: number,
    HSHD_NUM: string,
    LOYALTY_FLAG: YesNoFlag | undefined,
    AGE_RANGE: string | undefined,
    MARITAL: MaritalStatus | undefined,
    INCOME_RANGE: string| undefined,
    HOMEOWNER: Homeowner| undefined,
    HSHD_COMPOSITION: string | undefined,
    HH_SIZE: string | undefined,
    CHILDREN: string | undefined,
}

export interface Product {
    key: number,
    PRODUCT_NUM: string,
    DEPARTMENT: Department | undefined,
    COMMODITY: string,
    BRAND_TY: BrandType | undefined,
    NATURAL_ORGANIC_FLAG: YesNoFlag | undefined,
}

export interface Transaction {
    key: number,
    BASKET_NUM: string,
    HSHD_NUM: string,
    PURCHASE_DATE: string,
    PRODUCT_NUM: string,
    SPEND: string,
    UNITS: string,
    STORE_REGION: StoreRegion| undefined,
    WEEK_NUM: string,
    YEAR: string,
}

export interface DataPull {
    key: number,
    HSHD_NUM: string,
    BASKET_NUM: string,
    DATE: string,
    PRODUCT_NUM: string,
    DEPARTMENT: Department | undefined,
    COMMODITY: string,
    SPEND: string,
    UNITS: string,
    STORE_REGION: StoreRegion| undefined,
    WEEK_NUM: string,
    YEAR: string,
    LOYALTY_FLAG: YesNoFlag | undefined,
    AGE_RANGE: string | undefined,
    MARITAL: MaritalStatus | undefined,
    INCOME_RANGE: string| undefined,
    HOMEOWNER: Homeowner| undefined,
    HSHD_COMPOSITION: string | undefined,
    HH_SIZE: string | undefined,
    CHILDREN: string | undefined,
}

export const householdColumns = [
    {
        title: 'Household Number',
        dataIndex: 'HSHD_NUM',
        key: 'HSHD_NUM',
      },
      {
        title: 'Loyalty Flag',
        dataIndex: 'LOYALTY_FLAG',
        key: 'LOYALTY_FLAG',
      },
      {
        title: 'Age Range',
        dataIndex: 'AGE_RANGE',
        key: 'AGE_RANGE',
      },
      {
        title: 'Marital Status',
        dataIndex: 'MARITAL',
        key: 'MARITAL',
      },
      {
        title: 'Income Range',
        dataIndex: 'INCOME_RANGE',
        key: 'INCOME_RANGE',
      },
      {
        title: 'Homeowner',
        dataIndex: 'HOMEOWNER',
        key: 'HOMEOWNER',
      },
      {
        title: 'Household Composition',
        dataIndex: 'HSHD_COMPOSITION',
        key: 'HSHD_COMPOSITION',
      },
      {
        title: 'Household Size',
        dataIndex: 'HH_SIZE',
        key: 'HH_SIZE',
      },
      {
        title: 'Children',
        dataIndex: 'CHILDREN',
        key: 'CHILDREN',
      }
];

export const datapullsColumns = [
    {
        title: 'Household Number',
        dataIndex: 'HSHD_NUM',
        key: 'HSHD_NUM',
      },
      {
        title: 'Basket Number',
        dataIndex: 'BASKET_NUM',
        key: 'BASKET_NUM',
      },
      {
        title: 'Date',
        dataIndex: 'DATE',
        key: 'DATE',
      },
      {
        title: 'Product Number',
        dataIndex: 'PRODUCT_NUM',
        key: 'PRODUCT_NUM',
      },
      {
        title: 'Department',
        dataIndex: 'DEPARTMENT',
        key: 'DEPARTMENT',
      },
      {
        title: 'Commodity',
        dataIndex: 'COMMODITY',
        key: 'COMMODITY',
      },
      {
        title: 'Spend',
        dataIndex: 'SPEND',
        key: 'SPEND',
      },
      {
        title: 'Units',
        dataIndex: 'UNITS',
        key: 'UNITS',
      },
      {
        title: 'Store Region',
        dataIndex: 'STORE_REGION',
        key: 'STORE_REGION',
      },
      {
        title: 'Week Number',
        dataIndex: 'WEEK_NUM',
        key: 'WEEK_NUM',
      },
      {
        title: 'Year',
        dataIndex: 'YEAR',
        key: 'YEAR',
      },
      {
        title: 'Loyalty Flag',
        dataIndex: 'LOYALTY_FLAG',
        key: 'LOYALTY_FLAG',
      },
      {
        title: 'Age Range',
        dataIndex: 'AGE_RANGE',
        key: 'AGE_RANGE',
      },
      {
        title: 'Marital Status',
        dataIndex: 'MARITAL',
        key: 'MARITAL',
      },
      {
        title: 'Income Range',
        dataIndex: 'INCOME_RANGE',
        key: 'INCOME_RANGE',
      },
      {
        title: 'Homeowner',
        dataIndex: 'HOMEOWNER',
        key: 'HOMEOWNER',
      },
      {
        title: 'Household Composition',
        dataIndex: 'HSHD_COMPOSITION',
        key: 'HSHD_COMPOSITION',
      },
      {
        title: 'Household Size',
        dataIndex: 'HH_SIZE',
        key: 'HH_SIZE',
      },
      {
        title: 'Children',
        dataIndex: 'CHILDREN',
        key: 'CHILDREN',
      },
];