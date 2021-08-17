import React, { useState } from "react";
import NewLocationForm from "./NewLocationForm";
import { Modal, Button } from "antd";

function NewLocationModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    
    return (
        <>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <NewLocationForm />
          </Modal>
        </>
      );
}

export default NewLocationModal;