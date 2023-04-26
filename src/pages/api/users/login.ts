import { db, methodValidation } from "@/helpers";
import { queryCheckUser } from "@/models";
import { ResponseData } from "@/types";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  methodValidation(req, res, "POST", async () => {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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

      if (!user) {
        return res.status(400).send({
          status: "Failed",
          message: "Email or password doesn't correct",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(400).send({
          status: "Failed",
          message: "Email or password doesn't correct",
        });
      }

      delete user.password;

      const token = process.env.TOKEN_KEY ? jwt.sign(user, process.env.TOKEN_KEY) : undefined;

      res.status(200).send({
        status: "Success",
        message: "Success Login",
        data: {
          ...user,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "Failed",
        message: "Internal server error",
      });
    }
  });
}
