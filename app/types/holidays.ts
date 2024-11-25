export interface Holiday {
    holiday: string; startDate: string; endDate: string
}

export const allHolidayData: { holidayData: Array<Holiday> } = {
    holidayData: [
        {
            holiday: "Christmas",
            startDate: "12/18",
            endDate: "01/01"
        },
        {
            holiday: "New Year",
            startDate: "12/25",
            endDate: "01/01"
        },
        {
            holiday: "Thanksgiving",
            startDate: "11/21",
            endDate: "12/05"
        },
        {
            holiday: "Halloween",
            startDate: "10/24",
            endDate: "11/07"
        },
        {
            holiday: "St. Patricks Day",
            startDate: "03/10",
            endDate: "03/24"
        },
        {
            holiday: "Easter",
            startDate: "04/01",
            endDate: "04/14"
        },
        {
            holiday: "Fourth of July",
            startDate: "06/27",
            endDate: "07/04"
        },

    ]
};
