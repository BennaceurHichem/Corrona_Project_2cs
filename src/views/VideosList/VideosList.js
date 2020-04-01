import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import CardVideo from 'components/Card/CardVideo.js'


export default function TableList() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <CardVideo title="corona article" description="Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Most people who become infected experience mild illness and recover, but it can be more severe for others. Take care of your health and protect others by doing the following:" maxWidth="400px"/>

      </GridItem>
    </GridContainer>
  );
}
