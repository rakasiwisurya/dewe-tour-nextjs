import { db, modelValidation } from "@/helpers";

export const getDataUser = async (email: string) => {
  const queryCheckUser = `
  SELECT * FROM users
  LEFT JOIN genders ON users.gender_id = genders.gender_id
  WHERE email = $1
  `;

  return await modelValidation("getDataUser", async () => {
    return await db.oneOrNone(queryCheckUser, [email]);
  });
};

export const saveDataUser = async (
  fullname: string,
  email: string,
  hashedPassword: string,
  phone: string,
  gender_id: number,
  address: string,
  role: "user" | "admin" = "user"
) => {
  const queryInsertUser = `
  INSERT INTO users
    (fullname, email, password, phone, gender_id, address, role)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7)
  RETURNING
    user_id,
    fullname,
    email,
    phone,
    gender_id,
    address,
    role
  `;

  return await modelValidation("saveDataUser", async () => {
    return await db.one(queryInsertUser, [
      fullname,
      email,
      hashedPassword,
      phone,
      gender_id,
      address,
      role,
    ]);
  });
};
