import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Checkbox, Divider } from "antd";
import { Input } from "antd";
import { useSocket } from "../../../App";
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["lý do 1", "lý do 2", "lý do 3", "lý do 4"];
const defaultCheckedList = [];
const ReportModal = (props) => {
  const socket = useSocket();
  const { isModalOpen, setIsModalOpen, artwork, user } = props;
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    sendNotification("đã report", 1);
  };
  const sendNotification = (textType, type) => {
    socket.emit("push_notification", {
      artwork: artwork,
      pusher: user._doc,
      author: artwork?.user,
      textType,
      type,
    });
    setIsModalOpen(false)
  };

  return (
    <>
      <Modal
        title="Report artwork"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Gửi report
          </Button>,
        ]}
      >
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
        <Divider />
        <TextArea placeholder="Lý do khác" rows={4} />
        <Divider />
        <Button
          key="submit"
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          onClick={handleSubmit}
        >
          Gửi report
        </Button>
      </Modal>
    </>
  );
};

export default ReportModal;
