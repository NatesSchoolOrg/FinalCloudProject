import { doesNotMatch } from "assert";
import { TableProps, Tag, Tooltip  } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

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
    // North: 'North', no north region in data
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
    HSHD_NUM: number,
    BASKET_NUM: number,
    DATE: string,
    PRODUCT_NUM: number,
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

export const datapullsColumns: TableProps<DataPull>['columns'] = [
    {
        title: 'Household Number',
        dataIndex: 'HSHD_NUM',
        key: 'HSHD_NUM',
        sorter: (a: DataPull, b: DataPull) => a.HSHD_NUM - b.HSHD_NUM,
        render: (value: string) => {
          return (
            <Tooltip title={value}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: "50px",
                fontWeight: 'bold',
              }}>
                {value}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Basket Number',
        dataIndex: 'BASKET_NUM',
        key: 'BASKET_NUM',
        sorter: (a: DataPull, b: DataPull) => a.BASKET_NUM - b.BASKET_NUM,
      },
      {
        title: 'Date',
        dataIndex: 'DATE',
        key: 'DATE',
        sorter: (a: DataPull, b: DataPull) => new Date(a.DATE).getTime() - new Date(b.DATE).getTime(),
        render: (value: string) => {
          const formattedDate = new Date(value).toLocaleDateString();
          return (
            <Tooltip title={formattedDate}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {formattedDate}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Product Number',
        dataIndex: 'PRODUCT_NUM',
        key: 'PRODUCT_NUM',
        sorter: (a: DataPull, b: DataPull) => a.PRODUCT_NUM - b.PRODUCT_NUM,
      },
      {
        title: 'Department',
        dataIndex: 'DEPARTMENT',
        key: 'DEPARTMENT',
        showSorterTooltip: {target: 'full-header'},
        filters: [
          ...Object.entries(DepartmentEnum).map(([key, value]) => ({
            text: value,
            value: key,
          })),
        ],
        onFilter: (value, record: DataPull) => record.DEPARTMENT === value as Department,
        sorter: (a: DataPull, b: DataPull) => a.DEPARTMENT && b.DEPARTMENT ? a.DEPARTMENT.localeCompare(b.DEPARTMENT) : -1,
        render: (value: Department) => {
          let color = 'geekblue';
          if (value === DepartmentEnum.Food) {
            color = 'green';
          } else if (!value) {
            color = 'black';
          }
          return (
            <Tag color={color} key={value}>
              {value ? value.toUpperCase() : 'N/A'}
            </Tag>
          );
        },
      },
      {
        title: 'Commodity',
        dataIndex: 'COMMODITY',
        key: 'COMMODITY',
        sorter: (a: DataPull, b: DataPull) => a.COMMODITY.localeCompare(b.COMMODITY),
        render: (value: string) => {
          return (
            <Tooltip title={value}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: "80px"
              }}>
                {value}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Spend',
        dataIndex: 'SPEND',
        key: 'SPEND',
        render: (value: string) => `$${value}`,
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
        render: (value: StoreRegion | undefined) => {
          let color = value === StoreRegionEnum.South ? 'green' : value === StoreRegionEnum.East ? 'orange' : value === StoreRegionEnum.West ? 'red' : 'black';
          return (
            <Tag color={color} key={value}>
              {value || 'N/A'}
            </Tag>
          );
        },
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
        align: 'center',
        render: (value: string) => {
          return (
            <Tooltip title={value}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {value === YesNoFlagEnum.Yes ? <CheckOutlined /> : <CloseOutlined />}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Age Range',
        dataIndex: 'AGE_RANGE',
        key: 'AGE_RANGE',
        render: (value: string | undefined) => (
          <Tooltip title={value || "No data available"}>
            <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {value || "N/A"}
            </div>
          </Tooltip>
        )
      },
      {
        title: 'Marital Status',
        dataIndex: 'MARITAL',
        key: 'MARITAL',
        render: (value: string | undefined) => (
          <Tooltip title={value || "No data available"}>
            <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {value || "N/A"}
            </div>
          </Tooltip>
        )
      },
      {
        title: 'Income Range',
        dataIndex: 'INCOME_RANGE',
        key: 'INCOME_RANGE',
        render: (value: string) => {
          return (
            <Tooltip title={value}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: "80px"
              }}>
                {value || "N/A"}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Homeowner',
        dataIndex: 'HOMEOWNER',
        key: 'HOMEOWNER',
        render: (value: string | undefined) => (
          <Tooltip title={value || "No data available"}>
            <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {value || "N/A"}
            </div>
          </Tooltip>
        )
      },
      {
        title: 'Household Composition',
        dataIndex: 'HSHD_COMPOSITION',
        key: 'HSHD_COMPOSITION',
        render: (value: string) => {
          return (
            <Tooltip title={value}>
              <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: "80px"
              }}>
                {value || "N/A"}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: 'Household Size',
        dataIndex: 'HH_SIZE',
        key: 'HH_SIZE',
        render: (value: string | undefined) => (
          <Tooltip title={value || "No data available"}>
            <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {value || "N/A"}
            </div>
          </Tooltip>
        )
      },
      {
        title: 'Children',
        dataIndex: 'CHILDREN',
        key: 'CHILDREN',
        render: (value: string | undefined) => (
          <Tooltip title={value || "No data available"}>
            <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {value || "N/A"}
            </div>
          </Tooltip>
        )
      },
];