export type CalendarStateType = {
    isErrorGetUserTrainings: boolean;
    isSuccessGetUserTrainings: boolean;
    isErrorTrainingList: boolean;
    isSuccessGetTrainingList: boolean;
    isPopoverOpen: boolean;
    currentDate: string;
    currentDateUserTrainings: [];
    trainingList: [];
    popoverOffset: [number, number];
    userTrainings: [];
}
