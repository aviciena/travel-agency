'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function AlertDialog(props) {
  const { open, title, message, onLeftAction, onRightAction, leftText, rightText, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onLeftAction &&
          <Button onClick={onLeftAction}>
            {leftText}
          </Button>
        }
        {onRightAction &&
          <Button onClick={onRightAction}>
            {rightText}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}