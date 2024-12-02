import { parse } from "path";
import { Household, StoreRegion, YesNoFlag, MaritalStatus, Product, Transaction, Homeowner, BrandType, Department, DepartmentEnum, BrandTypeEnum, HomeownerEnum, MaritalStatusEnum, StoreRegionEnum, YesNoFlagEnum, DataPull, Commodity, AgeRange, IncomeRange, WeeklyCommodityAmounts, Churn, BasketFrequency } from "../types/data-interfaces";

export class DataUtilities {
    private static removeWhiteSpace = (string: string | string[]): string | undefined => {
        if (typeof string === 'object') {
            string = string[0];
        }
        let noWhitespace = string.trim();
        return noWhitespace === 'null' ? undefined : noWhitespace;
    }

    private static cleanUpData = (data: any[]): any[] => {
        return data.map((item) => {
            for (let key in item) {
                item[key] = typeof item[key] !== 'number' ? DataUtilities.removeWhiteSpace(item[key]) : item[key];
            }
            return item;
        })
    }

    private static parseLoyaltyFlag = (loyaltyFlag: string): YesNoFlag | undefined => {
        switch (loyaltyFlag) {
            case 'Y':
                return YesNoFlagEnum.Yes;
            case 'N':
                return YesNoFlagEnum.No;
            default:
                return undefined;
        }
    }

    private static parseStoreRegion = (storeRegion: string): StoreRegion | undefined => {
        switch (storeRegion) {
            // case 'NORTH':
            //     return StoreRegionEnum.North;
            case 'SOUTH':
                return StoreRegionEnum.South;
            case 'EAST':
                return StoreRegionEnum.East;
            case 'WEST':
                return StoreRegionEnum.West;
            default:
                return undefined;
        }
    }

    private static parseMaritalStatus = (maritalStatus: string): MaritalStatus | undefined => {
        switch (maritalStatus) {
            case 'Married':
                return MaritalStatusEnum.Married;
            case 'Single':
                return MaritalStatusEnum.Single;
            default:
                return undefined;
        }
    }

    private static parseHomeowner = (homeowner: string): Homeowner | undefined => {
        switch (homeowner) {
            case 'Homeowner':
                return HomeownerEnum.Homeowner;
            case 'Renter':
                return HomeownerEnum.Renter;
            default:
                return undefined;
        }
    }

    private static parseOrganicFlag = (organicFlag: string): YesNoFlag | undefined => {
        switch (organicFlag) {
            case 'Y':
                return YesNoFlagEnum.Yes;
            case 'N':
                return YesNoFlagEnum.No;
            default:
                return undefined;
        }
    }

    private static parseBrandType = (brandType: string): BrandType | undefined => {
        switch (brandType) {
            case 'PRIVATE':
                return BrandTypeEnum.Private;
            case 'NATIONAL':
                return BrandTypeEnum.National;
            default:
                return undefined;
        }
    }

    private static parseDepartment = (department: string): Department | undefined => {
        switch (department) {
            case 'FOOD':
                return DepartmentEnum.Food;
            case 'NON-FOOD':
                return DepartmentEnum.NonFood;
            default:
                return undefined;
        }
    };


    static mapHouseHoldData = (data: any[]): Household[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                key: index,
                HSHD_NUM: item['HSHD_NUM'],
                LOYALTY_FLAG: this.parseLoyaltyFlag(item['L']),
                AGE_RANGE: item['AGE_RANGE'],
                MARITAL: this.parseMaritalStatus(item['MARITAL']),
                INCOME_RANGE: item['INCOME_RANGE'],
                HOMEOWNER: this.parseHomeowner(item['HOMEOWNER']),
                HSHD_COMPOSITION: item['HSHD_COMPOSITION'],
                HH_SIZE: item['HH_SIZE'],
                CHILDREN: item['CHILDREN']
            }
        })
    }

    static mapTransactionData = (data: any[]): Transaction[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                key: index,
                BASKET_NUM: item['BASKET_NUM'],
                HSHD_NUM: item['HSHD_NUM'],
                PURCHASE_DATE: item['PURCHASE_DATE'],
                PRODUCT_NUM: item['PRODUCT_NUM'],
                SPEND: item['SPEND'],
                UNITS: item['UNITS'],
                WEEK_NUM: item['WEEK_NUM'],
                STORE_REGION: this.parseStoreRegion(item['STORE_REGION']),
                YEAR: item['YEAR']
            }
        })
    }

    static mapProductData = (data: any[]): Product[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                key: index,
                PRODUCT_NUM: item['PRODUCT_NUM'],
                DEPARTMENT: item['DEPARTMENT'],
                COMMODITY: item['COMMODITY'],
                BRAND_TY: this.parseBrandType(item['BRAND_TY']),
                NATURAL_ORGANIC_FLAG: this.parseOrganicFlag(item['NATURAL_ORGANIC_FLAG'])
            }
        })
    }

    static mapDataPull = (data: any[]): DataPull[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                key: index,
                HSHD_NUM: item['HSHD_NUM'],
                BASKET_NUM: parseInt(item['BASKET_NUM']),
                DATE: item['PURCHASE_DATE'],
                PRODUCT_NUM: item['PRODUCT_NUM'],
                DEPARTMENT: this.parseDepartment(item['DEPARTMENT']),
                COMMODITY: item['COMMODITY'],
                SPEND: item['SPEND'],
                UNITS: item['UNITS'],
                STORE_REGION: this.parseStoreRegion(item['STORE_REGION']),
                WEEK_NUM: item['WEEK_NUM'],
                YEAR: item['YEAR'],
                LOYALTY_FLAG: this.parseLoyaltyFlag(item['L']),
                AGE_RANGE: item['AGE_RANGE'],
                MARITAL: this.parseMaritalStatus(item['MARITAL']),
                INCOME_RANGE: item['INCOME_RANGE'],
                HOMEOWNER: this.parseHomeowner(item['HOMEOWNER']),
                HSHD_COMPOSITION: item['HSHD_COMPOSITION'],
                HH_SIZE: item['HH_SIZE'],
                CHILDREN: item['CHILDREN'],
            }
        })
    }

    static mapCommodityData = (data: any[]): Commodity[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                name: item['COMMODITY'],
                amount: item['COUNT']
            } as Commodity
        })
    }

    static mapAgeRangeData = (data: any[]): AgeRange[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                range: item['AGE_RANGE'],
                amount: item['COUNT']
            }
        })
    }

    static mapIncomeRangeData = (data: any[]): IncomeRange[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                range: item['INCOME_RANGE'],
                amount: item['COUNT']
            }
        })
    }

    static mapWeeklySalesData = (data: any[]): WeeklyCommodityAmounts[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                week: item['WEEK_NUM'],
                year: item['YEAR'],
                amount: item['COUNT']
            }
        })
    };

    static mapChurnData = (data: any[]): Churn[] => {
        return this.cleanUpData(data).map((item, index) => {
            return {
                key: index,
                HSHD_NUM: item['HSHD_NUM'],
                PREDICTED_CHURN: Math.round(parseFloat(item['PREDICTED_CHURN']) * 100),
            }
        })
    }

    static mapBasketFrequencyData = (data: any[]): BasketFrequency[] => {
        return this.cleanUpData(data).map((item, index) => {
            console.log(item);
            return {
                key: index,
                PRODUCT_NUMS: item['PRUDUCT_NUMS'].split(',').map((num: string) => parseInt(num.replace(/[\[\]\s]/g, ''), 10)),
                COMBO_FREQUENCY: parseInt(item['COMBO_FREQUENCY']),
                COMBO_SIZE: parseInt(item['COMBO_SIZE']),
            }
        })
    }
}