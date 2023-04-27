import { NextApiResponse } from "next";

export const serverErrorValidation = async (
  res: NextApiResponse,
  controllerName: string,
  controllerAction: () => any
) => {
  try {
    await controllerAction();
  } catch (error) {
    console.error(`${controllerName}: ${error}`);
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};
