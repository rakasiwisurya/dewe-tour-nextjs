import { NextApiRequest, NextApiResponse } from "next";

export const methodValidation = (
  req: NextApiRequest,
  res: NextApiResponse,
  method: NextApiRequest["method"],
  action: () => void
) => {
  if (req.method === method) {
    action();
  } else {
    res.status(404).send({ status: "Failed", message: "Not Found" });
  }
};
