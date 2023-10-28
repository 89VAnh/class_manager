import { Form, FormInstance } from "antd";
import { createContext } from "react";
import { conduct } from "~/model/conduct";

export const EditableContext = createContext<FormInstance<conduct> | null>(
  null
);

type Props = {
  index: number;
};

export default function ConductRow({ index, ...props }: Props) {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr key={index} {...props} />
      </EditableContext.Provider>
    </Form>
  );
}
