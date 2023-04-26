import { ICLeaf } from "@/assets";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="position-relative">
      <div className="text-center bg-primary text-light py-3">
        <Container>Copyright &#169; 2023 Dewe Tour - Rakasiwi Surya. All Rights reserved</Container>
      </div>
      <Image
        src={ICLeaf}
        alt="Leaf"
        width={100}
        className="position-absolute bottom-0 end-0"
        priority
      />
    </div>
  );
};

export default Footer;
