import { ResponseData } from "@/types";
import { db, methodValidation } from "@/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { queryGenders } from "@/models";

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  methodValidation(req, res, "GET", async () => {
    try {
      const data = await db.any(queryGenders);
      res.status(200).json({ status: "Success", message: "Success get genders", data });
    } catch (error) {
      res.status(500).send({
        status: "Failed",
        message: "Internal server error",
      });
    }
  });
}
