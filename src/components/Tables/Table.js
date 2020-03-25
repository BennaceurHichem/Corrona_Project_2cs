import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

export default function Table() {
  const useStyles = makeStyles({
    root: {

      marginTop:'100px'
    }
  });

  const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: "titre Article ", field: "titreArticle" },
      { title: "Auteur", field: "auteur" },
      { title: "Contenu", field: "contenu", type: "string" }
    ],
    data: [
      {
        titreArticle: "Mehmet",
        auteur: "Baran",
        contenu: "ساتستستستستستنسنتسنسنسننسسننتس"
      },
      {
        titreArticle: "كورونا ارتيكل ",
        auteur: "هشام بن ناصر ",
        contenu: "السلام عليكم ورحمة الله وبركاته, في هذا المقال سنقوم ...."
      }
    ]
  });

  return (
    <Box width="75%" ml={20} mr={0}>
      <MaterialTable
        title="Liste Des articles reçus"
        columns={state.columns}
        //this data which will be
        data={state.data}
        detailPanelColumnAlignment="right"
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: "close",
            tooltip: "Reject Article",
            onClick: (event, rowData) => {
              // Do reject  operation here
              //here I will  make an API call to reject the article
            }
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </Box>
  );
}
