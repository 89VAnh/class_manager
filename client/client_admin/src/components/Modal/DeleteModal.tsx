/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { TFunction } from "i18next";
import { queryClient } from "~/lib/react-query";
import { useDisclosure } from "~/utils/modal";

interface Props {
  id: number | string;
  useDelete: any;
  cache: string;
  t: TFunction;
}

export default function DeleteModal({
  id,
  useDelete,
  cache,
  t,
}: Props): JSX.Element {
  const { open, close, isOpen } = useDisclosure();

  const handleDelete = useDelete({
    config: {
      onSuccess: (data: string) => {
        notification.success({ message: data });
        queryClient.invalidateQueries([cache]);
      },
      onError: (err: any) => {
        notification.error({
          message: t("message.delete_failure"),
          description: err.message,
        });
      },
    },
  });

  return (
    <>
      <Tooltip title={t("title_delete")}>
        <Button type='dashed' danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("title_delete")}
        open={isOpen}
        onCancel={close}
        onOk={() => {
          handleDelete.mutate([id]);
          close();
        }}></Modal>
    </>
  );
}
