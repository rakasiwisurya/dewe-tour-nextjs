import { ICHibiscus, ICPalm } from "@/assets";
import { fetchGenders, fetchRegister, useAppDispatch, useAppSelector } from "@/redux";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, ModalProps, Placeholder, Spinner } from "react-bootstrap";

const ModalRegister = ({
  onHide,
  onSwitch,
  isVisible,
  ...rest
}: ModalProps & { onSwitch: () => void }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    gender_id: 1,
    address: "",
  });

  const dispatch = useAppDispatch();
  const { isRegisterLoading } = useAppSelector((state) => state.user);
  const { isGendersLoading, genders } = useAppSelector((state) => state.gender);

  useEffect(() => {
    dispatch(fetchGenders());
  }, []);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = {
      ...form,
      gender_id: +form.gender_id,
    };

    dispatch(fetchRegister(newForm));
  };

  return (
    <Modal {...rest} onHide={onHide} centered>
      <div>
        <Image
          src={ICPalm}
          alt="ICPalm"
          className="position-absolute top-0 start-0"
          style={{ borderTopLeftRadius: "0.5rem" }}
          priority
        />
        <Image
          src={ICHibiscus}
          alt="ICHibiscus"
          className="position-absolute top-0 end-0"
          style={{ borderTopRightRadius: "0.5rem" }}
          priority
        />
      </div>
      <Modal.Body className="m-4">
        <div className="text-center my-4">
          <h2 className="fw-bold">Register</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label className="fw-bold fs-5">Full Name</Form.Label>
            <Form.Control type="text" value={form.fullname} onChange={handleChangeInput} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-bold fs-5">Email</Form.Label>
            <Form.Control type="email" value={form.email} onChange={handleChangeInput} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-bold fs-5">Password</Form.Label>
            <Form.Control
              type="password"
              value={form.password}
              onChange={handleChangeInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label className="fw-bold fs-5">Phone</Form.Label>
            <Form.Control type="tel" value={form.phone} onChange={handleChangeInput} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender_id">
            <Form.Label className="fw-bold fs-5">Gender</Form.Label>
            {isGendersLoading ? (
              <div>
                <Placeholder animation="glow">
                  <Placeholder xs={12} style={{ height: 37, borderRadius: "0.375rem" }} />
                </Placeholder>
              </div>
            ) : (
              <Form.Select
                value={form.gender_id}
                onChange={handleChangeSelect}
                disabled={isGendersLoading}
                required
              >
                {genders.map((gender) => (
                  <option key={gender.gender_id} value={gender.gender_id}>
                    {gender.gender_name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="address">
            <Form.Label className="fw-bold fs-5">Address</Form.Label>
            <Form.Control
              as="textarea"
              value={form.address}
              onChange={handleChangeInput}
              style={{ resize: "none" }}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button
              variant="primary"
              className="w-100 text-light fw-bold"
              type="submit"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading && <Spinner animation="border" variant="light" size="sm" />}
              <span className="ms-2">Register</span>
            </Button>
          </div>

          <div className="text-muted text-center">
            Already have an account?{" "}
            <span role="button" className="fw-bold" onClick={onSwitch}>
              Click Here
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
