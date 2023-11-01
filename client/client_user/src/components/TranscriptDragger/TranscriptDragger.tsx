import { InboxOutlined } from "@ant-design/icons";
import { Upload, notification } from "antd";
import { BASE_URL } from "~/constant/config";
import storage from "~/utils/storage";

type Props = {
  classId: string;
  semester: number;
  schoolYear: string;
  loadData: () => void;
};

export default function TranscriptDragger({
  classId,
  semester,
  schoolYear,
  loadData,
}: Props) {
  const { Dragger } = Upload;
  const changeFile = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      notification.success({
        message: `Tải lên file ${info.file.name} thành công!`,
      });
      loadData();
    } else if (status === "error") {
      notification.error({
        message: `Tải lên file ${info.file.name} thất bại!`,
      });
    }
  };

  return (
    <Dragger
      action={`${BASE_URL}Files/Transcript?Semester=${semester}&SchoolYear=${schoolYear}&ClassId=${classId}`}
      headers={{
        authorization: "Bearer " + storage.getToken(),
      }}
      name='file'
      onChange={changeFile}
      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>Nhấn hoặc thả file để upload file</p>
      <p className='ant-upload-hint'>
        {`Vui lòng tải lên file bảng điểm của lớp ${classId} học kỳ ${semester} năm học ${schoolYear}`}
      </p>
    </Dragger>
  );
}
