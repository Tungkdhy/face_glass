import React, { useState } from "react";
import { Upload, Button, message, Card, Row, Col, Input } from "antd";
import Icon, { PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import "./styles.css";
const FitImage = () => {
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const handleBeforeUpload = (file) => {
    // Manually add the file to the fileList state
    const base64 = getBase64(file, (url) => setImage(url));

    setFileList([...fileList, file]);
    // Return false to prevent Antd's default behavior of auto-uploading the file
    return false;
  };
  console.log(image);

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const handleUploadClick = () => {
    if (fileList.length === 0) {
      message.error("Please select a file before uploading.");
      return;
    }
    console.log(fileList);

    // Here you can manually handle the upload to your server
    fileList.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      // Example: Log file name to the console
      console.log(file.name);

      // Here you can use Axios or any other method to upload the file
      // axios.post('https://your-upload-endpoint.com/upload', formData)
      //   .then(response => {
      //     message.success(`${file.name} uploaded successfully.`);
      //   })
      //   .catch(error => {
      //     message.error(`${file.name} upload failed.`);
      //   });
    });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    console.log(info);

    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file, (imageUrl) => setImage(imageUrl));
    }
  };
  // const uploadButton = (

  // );
  return (
    <Card>
      <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={handleChange}
            beforeUpload={handleBeforeUpload} // Prevent auto-upload
            onRemove={handleRemove} // Handle file removal
            fileList={fileList} // Controlled file list
            showUploadList={false}
            // style={{
            //   height:260
            // }}
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={handleChange}
            beforeUpload={handleBeforeUpload} // Prevent auto-upload
            onRemove={handleRemove} // Handle file removal
            fileList={fileList} // Controlled file list
            showUploadList={false}
            // style={{
            //   height:260
            // }}
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleUploadClick}
            disabled={fileList.length === 0}
            // style={{ marginTop: 16 }}
          >
            Xóa kính
          </Button>
        </Col>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={handleChange}
            beforeUpload={handleBeforeUpload} // Prevent auto-upload
            onRemove={handleRemove} // Handle file removal
            fileList={fileList} // Controlled file list
            showUploadList={false}
            // style={{
            //   height:260
            // }}
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Col>
      </Row>
      <Input placeholder="Tên" />
      <Button
        type="primary"
        onClick={handleUploadClick}
        disabled={fileList.length === 0}
        // style={{ marginTop: 16 }}
      >
        Lưu
      </Button>
      <style jsx>{`
        .ant-upload.ant-upload-select-picture-card {
          width: 200px;
          height: 240px; /* Set the desired height */
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px dashed #d9d9d9;
          border-radius: 4px;
        }
      `}</style>
    </Card>
  );
};

export default FitImage;
