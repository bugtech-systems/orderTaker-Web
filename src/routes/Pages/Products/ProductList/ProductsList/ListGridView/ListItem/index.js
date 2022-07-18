import React from "react";
import CmtCard from "../../../../../../../@coremat/CmtCard";
import CmtCardHeader from "../../../../../../../@coremat/CmtCard/CmtCardHeader";
import CmtCardContent from "../../../../../../../@coremat/CmtCard/CmtCardContent";
import {popularProducts} from "../../../../../../../@fake-db/modules/products";
import ListItem from "./ListItem";
import CmtGridView from "../../../../../../../@coremat/CmtGridView";
import PerfectScrollbar from "react-perfect-scrollbar";

const PopularProducts = () => {
  console.log(popularProducts);
  return (
    <CmtCard>
      <CmtCardHeader title="Popular Products" />
      <CmtCardContent>
        {/* <PerfectScrollbar style={{ height: 280 }}> */}
        <CmtGridView
          itemPadding={24}
          responsive={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3
          }}
          data={popularProducts}
          renderRow={(item, index) => <ListItem key={index} item={item} />}
        />
        {/* </PerfectScrollbar> */}
      </CmtCardContent>
    </CmtCard>
  );
};

export default PopularProducts;
