export const queryCheckUser = `
SELECT * FROM users
LEFT JOIN genders ON users.gender_id = genders.gender_id
WHERE email = $1
`;

export const queryInsertUser = `
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
