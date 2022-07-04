  import React, { useState } from "react";
  import CreateIcon from "@material-ui/icons/Create";
  import {
      Box, Button, Snackbar, Table,
      TableBody, TableCell, TableHead, TableRow
  } from "@material-ui/core";
  import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
  import AddBoxIcon from "@material-ui/icons/AddBox";
  import DoneIcon from "@material-ui/icons/Done";
  import ClearIcon from "@material-ui/icons/Clear";
  import { makeStyles } from "@material-ui/core/styles";
  import Alert from "@material-ui/lab/Alert";
  import Dialog from "@material-ui/core/Dialog";
  import DialogActions from "@material-ui/core/DialogActions";
  import DialogContent from "@material-ui/core/DialogContent";
  import DialogContentText from "@material-ui/core/DialogContentText";
  import DialogTitle from "@material-ui/core/DialogTitle";
    
  const useStyles = makeStyles({
      root: {
          "& > *": {
              borderBottom: "unset",
          },
      },
      table: {
          minWidth: 650,
      },
      snackbar: {
          bottom: "104px",
      },
  });
    
  function TableDemo() {
      const classes = useStyles();
    
      const [rows, setRows] = useState([
          { id: 1, identificador: "", produto: "", marca: "", preco: "" },
      ]);
    
      const [open, setOpen] = React.useState(false);
      const [isEdit, setEdit] = React.useState(false);
      const [disable, setDisable] = React.useState(true);
      const [showConfirm, setShowConfirm] = React.useState(false);
    
      const handleClose = (event, reason) => {
          if (reason === "clickaway") {
              return;
          }
          setOpen(false);
      };
    
      const handleAdd = () => {
          setRows([
              ...rows,
              {
                  id: rows.length + 1, identificador: "", produto: "",
                  marca: "", preco: ""
              },
          ]);
          setEdit(true);
      };
    
      const handleEdit = (i) => {
          setEdit(!isEdit);
      };
    
      const handleSave = () => {
          setEdit(!isEdit);
          setRows(rows);
          console.log("saved : ", rows);
          setDisable(true);
          setOpen(true);
      };
    
      const handleInputChange = (e, index) => {
          setDisable(false);
          const { name, value } = e.target;
          const list = [...rows];
          list[index][name] = value;
          setRows(list);
      };
    
      const handleConfirm = () => {
          setShowConfirm(true);
      };
    
      const handleRemoveClick = (i) => {
          const list = [...rows];
          list.splice(i, 1);
          setRows(list);
          setShowConfirm(false);
      };
    
      const handleNo = () => {
          setShowConfirm(false);
      };
    
    return (
      <TableBody>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          className={classes.snackbar}
        >
          <Alert onClose={handleClose} severity="success">
            Produto salvo com sucesso!
          </Alert>
        </Snackbar>
        <Box margin={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {isEdit ? (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    ADICIONAR
                  </Button>
                  {rows.length !== 0 && (
                    <div>
                      {disable ? (
                        <Button disabled align="right" onClick={handleSave}>
                          <DoneIcon />
                          SALVAR
                        </Button>
                      ) : (
                        <Button align="right" onClick={handleSave}>
                          <DoneIcon />
                          SALVAR
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    ADICIONAR
                  </Button>
                  <Button align="right" onClick={handleEdit}>
                    <CreateIcon />
                    EDITAR
                  </Button>
                </div>
              )}
            </div>
          </div>
          <TableRow align="center"></TableRow>
    
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>IDENTIFICADOR</TableCell>
                <TableCell>PRODUTO</TableCell>
                <TableCell>MARCA</TableCell>
                <TableCell>PREÇO R$</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {rows.map((row, i) => {
                return (
                  <div>
                    <TableRow>
                      {isEdit ? (
                        <div>
                          <TableCell padding="none">
                            <input
                              value={row.identificador}
                              name="identificador"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </TableCell>
                          <TableCell padding="none">
                            <input
                              value={row.produto}
                              name="produto"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </TableCell>
                          <TableCell padding="none">
                            <input
                              value={row.marca}
                              name="marca"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </TableCell>
                          <TableCell padding="none">
                            <input
                              value={row.preco}
                              name="preco"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </TableCell>
                          
                        </div>
                      ) : (
                        <div>
                          <TableCell component="th" scope="row">
                            {row.identificador}
                          </TableCell> 
                          <TableCell component="th" scope="row">
                            {row.produto}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.marca}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.preco}
                          </TableCell>
                        </div>
                      )}
                      {isEdit ? (
                        <Button className="mr10" onClick={handleConfirm}>
                          <ClearIcon />
                        </Button>
                      ) : (
                        <Button className="mr10" onClick={handleConfirm}>
                          <DeleteOutlineIcon />
                        </Button>
                      )}
                      {showConfirm && (
                        <div>
                          <Dialog
                            open={showConfirm}
                            onClose={handleNo}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"CONFIRMAR EXCLUSÃO"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                TEM CERTEZA DE QUE DESEJA EXCLUIR O PRODUTO?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => handleRemoveClick(i)}
                                color="danger"
                                autoFocus
                              >
                                SIM
                              </Button>
                              <Button
                                onClick={handleNo}
                                color="primary"
                                autoFocus
                              >
                                NÃO
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )}
                    </TableRow>
                  </div>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </TableBody>
    );
  }
    
  export default TableDemo;