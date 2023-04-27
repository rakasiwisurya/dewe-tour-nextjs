import { ICHibiscus, ICPalm } from "@/assets";
import { fetchLogin, useAppDispatch, useAppSelector } from "@/redux";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, ModalProps, Spinner } from "react-bootstrap";

const ModalLogin = ({ onHide, onSwitch, ...rest }: ModalProps & { onSwitch: () => void }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { isLoginLoading } = useAppSelector((state) => state.user);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLogin(form));
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
          <h2 className="fw-bold">Login</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-bold fs-5">Email</Form.Label>
            <Form.Control type="email" value={form.email} onChange={handleChangeInput} required />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label className="fw-bold fs-5">Password</Form.Label>
            <Form.Control
              type="password"
              value={form.password}
              onChange={handleChangeInput}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button
              variant="primary"
              className="w-100 text-light fw-bold"
              type="submit"
              disabled={isLoginLoading}
            >
              {isLoginLoading && <Spinner animation="border" variant="light" size="sm" />}
              <span className="ms-2">Login</span>
            </Button>
          </div>

          <div className="text-muted text-center">
            Doesn't have an account?{" "}
            <span role="button" className="fw-bold" onClick={onSwitch}>
              Click Here
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
