export enum LABEL_ACTION {
  EDIT,
  DELETE,
}

export enum NOTE_ACTION {
  ADD = "ADD",
  ARCHIVE = "ARCHIVE",
  BACKGROUND = "BACKGROUND",
  UNARCHIVE = "UNARCHIVE",
  PIN = "PIN",
  UNPIN = "UNPIN",
  BIN = "BIN",
  DELETE = "DELETE",
  RESTORE = "RESTORE",
  UPDATE = "UPDATE",
}

export enum NOTE_STATUS {
  ACTIVE = "active",
  ARCHIVED = "archived",
  BINNED = "binned",
}

const ENUM = { LABEL_ACTION, NOTE_ACTION, NOTE_STATUS };

export default ENUM;
