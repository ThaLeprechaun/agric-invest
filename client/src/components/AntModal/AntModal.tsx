import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';

interface ModalProp {
  buttonName: string;
  children: JSX.Element;
}

export default function AntModal({ buttonName, children }: ModalProp) {
  const initialState = {
    loading: false,
    visible: false,
  };
  const [modalState, setModalState] = useState(initialState);
  const { loading, visible } = modalState;
  const selectedData = useSelector((state: any) => state);
  const userId = selectedData.authUser!.user.user._id;

  const showModal = () => {
    if (userId === undefined || userId == null) {
      return alert('You need to Login/Register to make an investment');
    }

    setModalState({ ...modalState, visible: true });
  };
  const handleOk = () => {
    setModalState({ ...modalState, loading: true });
    setTimeout(() => {
      setModalState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setModalState({ ...modalState, visible: false });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonName}
      </Button>
      <Modal
        visible={visible}
        title="Investment Form"
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        //     Submit
        //   </Button>,
        // ]}
      >
        {children}
      </Modal>
    </>
  );
}
