import { db, methodValidation } from "@/helpers";
import { queryCheckUser, queryInsertUser } from "@/models";
import { ResponseData } from "@/types";
import bcrypt from "bcrypt";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  methodValidation(req, res, "POST", async () => {
    const { fullname, email, password, phone, gender_id, address } = req.body;

    const schema = Joi.object({
      fullname: Joi.string().max(50).required(),
      email: Joi.string().email().max(50).required(),
      password: Joi.string().required(),
      phone: Joi.string().max(20).required(),
      gender_id: Joi.number().required(),
      address: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    try {
      const user = await db.oneOrNone(queryCheckUser, [email]);

      if (user) {
        return res.status(400).send({
          status: "Failed",
          message: "Email already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = await db.one(queryInsertUser, [
        fullname,
        email,
        hashedPassword,
        phone,
        gender_id,
        address,
        "user",
      ]);

      res.status(201).send({
        status: "Success",
        message: "Success register",
        data,
      });
    } catch (error) {
      res.status(500).send({
        status: "Failed",
        message: "Internal server error",
      });
    }
  });
}
