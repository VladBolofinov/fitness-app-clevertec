export const selectOptionValues = (currentDateUserTrainings,trainingList) => {
    const arrUserTrainingNames = Array.from(new Set(currentDateUserTrainings.map(item => item.name)));
    return trainingList.filter(item => !arrUserTrainingNames.includes(item.label));
}
