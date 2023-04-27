export const modelValidation = async (functionNmae: string, modelAction: () => any) => {
  try {
    return await modelAction();
  } catch (error) {
    console.error(`${functionNmae}: ${error}`);
    return null;
  }
};
