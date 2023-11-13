/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Tooltip,
  message,
} from "antd";
import dayjs from "dayjs";
import { queryClient } from "~/lib/react-query";
import { CACHE } from "~/loader/cache";
import {
  useCreateClass,
  useGetClassById,
  useUpdateClass,
} from "~/loader/class.loader";
import { useSearchDepartment } from "~/loader/department.loader";
import { useSearchLecturer } from "~/loader/lecturer.loader";
import { department } from "~/model/department";
import { useDisclosure } from "~/utils/modal";
import { RULES_FORM } from "~/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function ClassModal({ id, isCreate = true }: Props) {
  const { t } = useTranslation("translation", { keyPrefix: "class" });
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();

  const { RangePicker } = DatePicker;

  useGetClassById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data: any) {
        if (!data?.message) {
          form.setFieldsValue({
            ...data,
            year: [
              dayjs().set("year", data.fromYear),
              dayjs().set("year", data.toYear),
            ],
          });
        }
      },
    },
  });

  const update = useUpdateClass({
    config: {
      onSuccess: (data: any) => {
        if (data) {
          message.success(data);
          close();
          queryClient.invalidateQueries([CACHE.CLASS]);
        } else message.error(data.message);
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    },
  });

  const { data: departments } = useSearchDepartment({
    params: {},
  });

  const { data: lecturers } = useSearchLecturer({ params: {} });

  const create = useCreateClass({
    config: {
      onSuccess: (data: any) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          close();
          queryClient.invalidateQueries([CACHE.CLASS]);
        } else message.error(data.message);
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const year = [...values.year].map((x) => x.year());

        const dataPost = {
          ...values,
          fromYear: year[0],
          toYear: year[1],
        };

        if (isCreate) {
          create.mutate(dataPost);
        } else {
          update.mutate(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  return (
    <>
      {isCreate ? (
        <Button
          key='button'
          icon={<PlusOutlined />}
          onClick={open}
          type='primary'>
          {t("all.btn_add")}
        </Button>
      ) : (
        <Tooltip title={t("edit")}>
          <Button type='dashed' onClick={open} style={{ color: "#faad14" }}>
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      <Modal
        title={isCreate ? t("create") : t("update") + " " + id}
        width={"40vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={update.isLoading || create.isLoading}>
        <div
          style={{
            maxHeight: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}>
          <Form form={form} layout='vertical'>
            <Row gutter={32}>
              <ProFormText name={"id"} hidden />
              <Col span={24}>
                <ProFormText
                  name={"name"}
                  rules={[...RULES_FORM.required]}
                  label={t("fields.name")}
                  placeholder={t("fields.name")}
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name={"departmentId"}
                  rules={[...RULES_FORM.required]}
                  label={t("fields.department")}
                  options={
                    departments
                      ? departments.data.map((d: department) => ({
                          value: d.id,
                          label: d.name,
                        }))
                      : []
                  }
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name={"formTeacherId"}
                  rules={[...RULES_FORM.required]}
                  label={t("fields.formTeacher")}
                  options={
                    lecturers
                      ? lecturers.data.map((d: department) => ({
                          value: d.id,
                          label: d.name,
                        }))
                      : []
                  }
                />
              </Col>
              <Col span={12}>
                {/* <Form.Item
                  rules={[...RULES_FORM.required]}
                  label={t("fields.from_year")}
                  name={"fromYear"}>
                  <DatePicker
                    picker='year'
                    name={"fromYear"}
                    placeholder={t("fields.from_year")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[...RULES_FORM.required]}
                  label={t("fields.to_year")}
                  name={"toYear"}>
                  <DatePicker
                    picker='year'
                    name={"toYear"}
                    placeholder={t("fields.to_year")}
                  />
                </Form.Item> */}
                <Form.Item
                  name='year'
                  label={t("fields.year")}
                  rules={[...RULES_FORM.required]}>
                  <RangePicker name='year' picker='year' />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
