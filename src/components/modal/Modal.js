import React from "react";
import { Box, Modal as MuiModal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  borderRadius: "8px",
  bgcolor: "background.paper",
  p: 4,
  outline: "none",
};

export const Modal = (props) => {
  const { open, handleClose, children, size } = props;
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: size ? size : "400px",
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};
