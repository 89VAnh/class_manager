import { Form, Input, InputNumber, InputRef } from "antd";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { conduct } from "~/model/conduct";
import { EditableContext } from "./ConductRow";
import "./editable.module.scss";

type Props = {
  title: ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof conduct;
  record: conduct;
  min?: number;
  max?: number;
  handleSave: (record: conduct) => void;
};

export default function EditableCell({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  editable,
  children,
  dataIndex,
  record,
  min,
  max,
  handleSave,
  ...restProps
}: Props) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const [inputNumberStatus, setInputNumberStatus] = useState<
    "" | "warning" | "error" | undefined
  >("");
  const type = record != undefined ? typeof record[dataIndex] : "";

  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing)
      if (type === "number") inputNumberRef.current!.focus();
      else inputRef.current!.focus();
  }, [editing, type]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      if (
        type === "number" &&
        editing == true &&
        inputNumberRef.current!.value == ""
      ) {
        toggleEdit();
      }
      {
        const values = await form.validateFields();
        toggleEdit();
        if (type === "number") {
          handleSave({ ...record, [dataIndex]: Number(values[dataIndex]) });
        } else handleSave({ ...record, ...values });
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const keyUp = () => {
    const value = inputNumberRef.current?.value;
    if (value == "" || Number(value) < min! || Number(value) > max!) {
      setInputNumberStatus("error");
    } else {
      setInputNumberStatus("");
    }
  };

  let childNode = children;

  if (editable) {
    if (editing) {
      childNode = (
        <Form.Item
          key={dataIndex}
          style={{ margin: 0, cursor: "text" }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: "",
              type: "number",
              max: Number(max),
              min: Number(min),
            },
          ]}>
          {type === "number" ? (
            <InputNumber
              ref={inputNumberRef}
              onPressEnter={save}
              onBlur={save}
              onKeyUp={keyUp}
              status={inputNumberStatus}
              max={Number(max)}
              min={Number(min)}
              style={{
                width: "100%",
              }}
            />
          ) : (
            <Input
              type={type}
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
            />
          )}
        </Form.Item>
      );
    } else
      childNode = (
        <div className='editable-cell-value-wrap' onClick={toggleEdit}>
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
}
