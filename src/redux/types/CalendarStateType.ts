export type CalendarStateType = {
    isErrorGetUserTrainings: boolean;
    isSuccessGetUserTrainings: boolean;
    isErrorTrainingList: boolean;
    isSuccessGetTrainingList: boolean;
    isPopoverOpen: boolean;
    currentDate: string;
    currentDateUserTrainings: [];
    currentTrainingExercises: any;
    currentSelectValue: string;
    trainingList: [];
    popoverOffset: [number, number];
    userTrainings: [];
    isNextStepModal: boolean;
    isOpenDrawer: boolean;
}
