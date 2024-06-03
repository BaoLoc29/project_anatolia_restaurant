import React, { useEffect, useCallback } from "react";
import { Form, Input, Modal, Select, Button } from "antd";
import { getTableById } from "../../services/table.js";

const ModalCreateTable = ({
  form,
  loading,
  title,
  isModalOpen,
  handleCancel,
  handleOk,
  selectedTable,
}) => {
  const getTable = useCallback(async () => {
    try {
      const result = await getTableById(selectedTable);
      form.setFieldsValue({
        id_table: result.data.table.id_table,
        capacity: result.data.table.capacity,
        location: result.data.table.location,
        status: result.data.table.status,
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedTable, form]);
  useEffect(() => {
    if (selectedTable) getTable();
  }, [selectedTable, getTable]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      loading={loading}
      onCancel={handleCancel}
      style={{
        top: 50,
      }}
    >
      <div className="text-center text-xl font-bold mb-5">
        <h2>{title}</h2>
      </div>
      <Form form={form} name="Tables" onFinish={handleOk}>
        {selectedTable && (
          <>
            <label htmlFor="id_table" className="block text-sm font-bold mb-1">
              Mã bàn: <span className="text-red-500">*</span>
            </label>
            <Form.Item name="id_table" style={{ marginBottom: 10 }}>
              <Input
                id="id_table"
                placeholder="Mã bàn"
                className="text-base"
                disabled={true}
              />
            </Form.Item>
          </>
        )}

        <label htmlFor="capacity" className="block text-sm font-bold mb-1">
          Sức chứa của bàn: <span className="text-red-500">*</span>
        </label>
        <Form.Item
          name="capacity"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "Sức chứa của bàn không được để trống" },
            {
              pattern: /^([1-9]\d*)$/,
              message: "Sức chứa của bàn phải từ 1 người trở lên",
            },
          ]}
        >
          <Input
            placeholder="Sức chứa của bàn"
            className="text-base"
            type="number"
          />
        </Form.Item>

        <label htmlFor="location" className="block text-sm font-bold mb-1">
          Vị trí bàn: <span className="text-red-500">*</span>
        </label>
        <Form.Item
          name="location"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "Vị trí bàn không được để trống!" },
          ]}
        >
          <Select placeholder="--Chọn vị trí bàn--" className="text-base">
            <Select.Option value="Cạnh cửa sổ">Cạnh cửa sổ</Select.Option>
            <Select.Option value="Ngoài trời">Ngoài trời</Select.Option>
            <Select.Option value="Trung tâm">Trung tâm</Select.Option>
          </Select>
        </Form.Item>

        <label htmlFor="status" className="block text-sm font-bold mb-1">
          Trạng thái bàn: <span className="text-red-500">*</span>
        </label>
        <Form.Item
          name="status"
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: "Trạng thái bàn không được để trống!",
            },
          ]}
        >
          <Select placeholder="--Chọn trạng thái bàn--" className="text-base">
            <Select.Option value="Còn trống">Còn trống</Select.Option>
            <Select.Option value="Đang sử dụng">Đang sử dụng</Select.Option>
            <Select.Option value="Đã đặt cọc">Đã đặt cọc</Select.Option>
            <Select.Option value="Chưa đặt cọc">Chưa đặt cọc</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end">
          <Button onClick={handleCancel} className="mr-2 mb-2">
            Hủy
          </Button>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="mb-2"
          >
            {selectedTable ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalCreateTable;
