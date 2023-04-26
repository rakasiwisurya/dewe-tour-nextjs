import { ICDeweTourLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";

const Header = () => {
  const [isModalLoginShow, setIsModalLoginShow] = useState(false);
  const [isModalRegisterShow, setIsModalRegisterShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <Image src={ICDeweTourLogo} alt="Dewe Tour Logo" height={50} priority />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex gap-3 my-2 my-lg-0">
              <Button
                variant="outline-light"
                className="fw-semibold"
                style={{ fontSize: 14 }}
                onClick={() => setIsModalLoginShow(true)}
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="text-white fw-semibold"
                style={{ fontSize: 14 }}
                onClick={() => setIsModalRegisterShow(true)}
              >
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalRegister
        show={isModalRegisterShow}
        onHide={() => setIsModalRegisterShow(false)}
        onSwitch={() => {
          setIsModalRegisterShow(false);
          setIsModalLoginShow(true);
        }}
      />
      <ModalLogin
        show={isModalLoginShow}
        onHide={() => setIsModalLoginShow(false)}
        onSwitch={() => {
          setIsModalLoginShow(false);
          setIsModalRegisterShow(true);
        }}
      />
    </>
  );
};

export default Header;
