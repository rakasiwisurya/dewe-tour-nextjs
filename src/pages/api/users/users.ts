import { ResponseData } from "@/types";
import { methodValidation } from "@/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  methodValidation(req, res, "GET", () => {
    console.log("req.body", req.body);
    res.status(200).json({ status: "Success", message: "Login Success", data: null });
  });
}
