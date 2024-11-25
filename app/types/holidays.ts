export interface Holiday {
    holiday: string; startDate: string; endDate: string
}

export const allHolidayData: Holiday[] = [
        {
            holiday: "Christmas",
            startDate: "12/18/2019",
            endDate: "12/31/2019"
        },
        {
            holiday: "New Year",
            startDate: "12/25/2019",
            endDate: "01/08/2020"
        },
        {
            holiday: "Thanksgiving",
            startDate: "11/21/2019",
            endDate: "12/05/2019"
        },
        {
            holiday: "Halloween",
            startDate: "10/24/2019",
            endDate: "11/07/2019"
        },
        {
            holiday: "St. Patricks Day",
            startDate: "03/10/2020",
            endDate: "03/24/2020"
        },
        {
            holiday: "Easter",
            startDate: "04/01/2020",
            endDate: "04/14/2020"
        },
        {
            holiday: "Fourth of July",
            startDate: "06/27/2020",
            endDate: "07/04/2020"
        },
        {
            holiday: "Valentine Day",
            startDate: "02/07/2020",
            endDate: "02/21/2020"
        }
    ];
