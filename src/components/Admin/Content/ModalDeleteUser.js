import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {deleteUsers} from '../../../services/apiService';
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";


const ModalDeleteUser = (props) => {
  const {show, setShow, dataDelete} = props;
  const { t } = useTranslation();


  const handleClose = () => setShow(false);

const handleSubmitDeleteUser = async () => {
    let data = await deleteUsers(dataDelete.id);
    console.log(">>> check res: ", data)
    if(data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }
    if(data && data.EC !== 0) {
      toast.error(data.EM);
    }
}

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manage-users.modal.t-delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.manage-users.modal.confirm")}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : " "}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} backdrop="static">
            {t("admin.manage-users.modal.cancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("admin.manage-users.modal.sure")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
