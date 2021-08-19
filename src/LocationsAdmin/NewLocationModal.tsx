import React, { useState } from 'react';
import NewLocationForm from './NewLocationForm';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function NewLocationModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };
    return (
        <>
            <Button type="primary"
                icon={<PlusOutlined />}
                size={'small'}
                onClick={showModal}>
                ADD LOCATION
            </Button>

            <Modal
                title="ADD NEW LOCATION"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >

                <NewLocationForm />
            </Modal>
        </>
    );
}

export default NewLocationModal;