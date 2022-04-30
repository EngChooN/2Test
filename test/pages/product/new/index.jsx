import { useState } from "react";
import { withAuth } from "../../../src/commons/withAuth";
import ProductWriteContainer from "../../../src/components/units/product/write/ProductWrite.container";

function ProductNewPage() {
  const [isEdit] = useState(false);

  return <ProductWriteContainer isEdit={isEdit} />;
}

export default withAuth(ProductNewPage);
