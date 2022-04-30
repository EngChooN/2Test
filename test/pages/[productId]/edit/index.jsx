import { useState } from "react";
import { withAuth } from "../../../src/commons/withAuth";
import ProductWriteContainer from "../../../src/components/units/product/write/ProductWrite.container";

function ProductEditPage() {
  const [isEdit] = useState(true);

  return <ProductWriteContainer isEdit={isEdit} />;
}

export default withAuth(ProductEditPage);
