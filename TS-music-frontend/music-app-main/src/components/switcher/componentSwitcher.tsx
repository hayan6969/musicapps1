import React from "react";
import OfferRequest from "./../offer/offer-request";
import OfferConfirmation from "../offer/offer-confimartion";
import OrderOngoingFreelancer from "../order/order-ongoing-freelancer";
import OrderInfo from "../order/order-info";
import OrderUploadedWorks from "../order/order-uploaded-works";
import OrderDone from "../order/order-done";

interface componentProps {
  componentType: number;
}

const ComponentSwitcher = ({ componentType }: componentProps) => {
  switch (componentType) {
    case 1:
      return <OfferRequest />;
    case 2:
      return <OfferConfirmation />;
    case 3:
      return <OrderOngoingFreelancer />;
    case 4:
      return <OrderInfo />;
    case 5:
      return <OrderUploadedWorks />;
    case 6:
      return <OrderDone />;
    default:
      return <div>Invalid component type</div>;
  }
};

export default ComponentSwitcher;
