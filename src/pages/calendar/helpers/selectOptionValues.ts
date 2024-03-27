export const selectOptionValues = (currentDateUserTrainings:any,trainingList:any) => {
    const arrUserTrainingNames = Array.from(new Set(currentDateUserTrainings.map((item:any) => item.name)));
    return trainingList.filter((item:any) => !arrUserTrainingNames.includes(item.label));
}
