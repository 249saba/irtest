import ShellContainer from "@src/containers/shellContainer";
import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";
import { ReactComponent as Warning } from "@assets/vendor/icons/warning.svg";
import ImagePicker from "@src/shared/imagePicker/imagePicker";
import Divider from "@mui/material/Divider";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import TextArea from "@src/shared/textArea";
import imageLogo from "@assets/icons/imageLogo.png";
import { Fragment } from "react";
import Select from "@src/shared/select/select";
import Checkbox from "@src/shared/checkbox/checkbox";
import * as Yup from "yup";
import { FiSearch } from "react-icons/fi";
import Input from "@src/shared/input";
import Switch from "@mui/material/Switch";
import ArrowRight from "@assets/icons/gray_right_arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@src/index.scss";
import LazyImage from "@src/shared/lazyImage";
import SeperatorLine from "@src/shared/seperator/seperatorLine";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { handleToastMessage } from "@src/shared/toastify";
import { Breadcrumbs } from "@material-tailwind/react";
import VideoPicker from "@src/shared/videoPicker/videoPicker";
export interface initialSchemaValues {
  description: string;
  image: any;
  video: any,
}

const FormSchema = Yup.object().shape({
  description: Yup.string().required("Title is Required"),
  image: Yup.mixed().required("image is Required"),
  video: Yup.mixed().required("Video is Required"),
});
const initialValues: initialSchemaValues = {
    description: "",
    image: "",
    video: "",
  };
const AddShorts = ({ handleAddShort }: any) => {
  const navigate = useNavigate();
  const [text, setText] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (values: any) => {
    setIsLoading(true);
    console.log("values",values)
    const formData = new FormData();
    // if (typeof values.image !== "string" && values.image?.[0] !== undefined) {
    //   values.image.forEach((file: any, index: number) => {
    //     formData.append("image", file);
    //   });
    // }
    if (typeof values.video !== "string" && values.video?.[0] !== undefined) {
      values.video.forEach((file: any, index: number) => {
        formData.append("video", file);
      });
    }
    formData.append("title", values.description);
    formData.append("image", values.image);
    // formData.append("video", values.video);
    backendCall({
      url: `/api/vendor/shorts`,
      method: "POST",
      data: formData,
      contentType: "multipart/form-data;",
    }).then((res) => {
      if (res && !res.error) {
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        handleAddShort();
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <>
      <CustomCard styleClass="p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleChange,
            handleBlur,
            touched,
            values,
            setFieldTouched,
            setFieldValue,
          }) => {
            const uploadImage = async (field: string, files: any) => {
                setFieldValue(field, files);
              };
              const uploadVideo = async (files: any) => {
                setFieldValue("video", files);
              };
            return (
              <Form className="space-y-6  p-4  ">
                <CustomCard styleClass="p-4">
                  <div className="flex  justify-between  gap-2">
                    <div className="text-left ">
                      {/* <p className="text-gray-900 flex gap-1">
                        <span>Dashboard</span>/<span>Settings</span>/
                        <span>What's New</span>/<span>What's New</span>
                      </p> */}

                      <Breadcrumbs
                        aria-label="breadcrumb"
                        className="bg-inherit pl-0"
                      >
                        <Link to="/dashboard">
                          <p>Dashboard</p>
                        </Link>
                        {/* <Link to="/settings">
                          <p>Settings</p>
                        </Link> */}
                        <Link to="/shorts" className="text-gray">
                          <p>{"Shorts Management"}</p>
                        </Link>
                      </Breadcrumbs>
                      <h5 className="font-normal">Shorts Management</h5>
                    </div>
                    <div className="flex gap-4">
                      <CustomButton
                        type={"button"}
                        label="Cancel"
                        styleClass="btn-gray-light !rounded-md"
                          handleButtonClick={(e: any) => {
                            handleAddShort();
                          }}
                      />
                      <CustomButton
                        isLoading={isLoading}
                        type={"submit"}
                        label={"Add"}
                        styleClass="btn-black !rounded-md w-40 h-8"
                      />
                    </div>
                  </div>
                </CustomCard>
                <div className="space-y-5 text-left pb-4">
                <Input
                      name="description"
                      className="w-full"
                      id="description"
                      onChange={handleChange}
                      // placeholder="Enter your Reason Here"
                      label="Title"
                      onBlur={handleBlur}
                      value={values.description}
                    ></Input>
                    <ErrorMessage
                      name={`description`}
                      component={"span"}
                      className="text-xs capitalize text-red-100"
                    />
                  <div className="flex  text-left text-editor text-black-100 w-full ">
                    <div className="space-y-4 w-[90%] gap-4  ">
                      <p className="text-sm text-black-900">Upload Image</p>

                      <div className="w-full">
                        <ImagePicker
                          className="flex-1"
                          // error={errors.images as string}
                          // value={values.images}
                          resetValue={() => {
                            setFieldValue("image", null);
                          }}
                          onChange={(files) => {
                            setFieldTouched("image", true);
                            return uploadImage("image", files[0]);
                          }}
                          onSizeError={() => {
                            handleToastMessage("error", "please select image of size less than 10mb");
                          }}
                          touched={true}
                        >
                          <div className="p-6 border-[2px] border-dashed border-gray-400 ">
                            <p className="text-gray-900 font-normal text-sm">
                              Drop your images here, Or{" "}
                              <span className="text-blue-900 cursor-pointer">
                                Click to browse
                              </span>{" "}
                              1200*600 (3:4) Recommended, Up to 10MB Each
                            </p>
                          </div>
                          <div className="flex pt-5  w-1/2">
                        <CustomButton
                          type={"button"}
                          handleButtonClick={(files: any) => {
                            setFieldTouched("images", true);
                             return uploadImage("image", files[0]);
                          }}
                          label="Upload Image"
                          styleClass="btn-black !rounded-md"
                        />
                      </div>
                        </ImagePicker>
                        {values.image && (
                          <div className="flex justify-between items-center h-12  rounded bg-gray-100 p-3 text-black-100">
                            <div className="flex items-center gap-6 p-2">
                              <LazyImage
                                src={URL.createObjectURL(values.image)}
                                className="h-8 w-8 rounded"
                              />
                              {/* <div className="flex flex-col">
                            <p>
                              <span>ID Card (Front).jpg</span>
                            </p>
                            <p>
                              <span className="text-gray-500">200kb</span>
                            </p>
                          </div> */}
                            </div>
                          </div>
                        )}
                        <ErrorMessage
                          name={`image`}
                          component={"span"}
                          className="text-xs capitalize text-red-100"
                        />
                      </div>

                   
                    </div>
                    <Divider orientation="vertical" flexItem>
                      Or
                    </Divider>

                    <div className="space-y-4 w-[90%] gap-4 ">
                      <p className="text-sm text-black-900">Upload Video</p>

                      <div className="w-full">
                    <VideoPicker
                      className="flex-1"
                      // error={errors.images as string}
                      // value={values.images}
                      resetValue={() => {
                        setFieldValue("video", []);
                      }}
                      // removeImage={(index) => {
                      //   const temp_images: any = values.images;
                      //   temp_images.splice(index, 1);
                      //   setFieldValue("images", temp_images);
                      // }}
                      onChange={(files) => {
                        setFieldTouched("video", true);
                        return uploadVideo(files);
                      }}
                      onSizeError={(error) => {
                        handleToastMessage("error", "please select video of size less than 10mb");
                      }}
                      touched={true}
                    >
                      <div className="p-6 border-[2px] border-dashed border-gray-400 ">
                        <p className="text-gray-900 font-normal text-sm">
                          Drop your images here, Or{" "}
                          <span className="text-blue-900 cursor-pointer">
                            Click to browse
                          </span>{" "}
                          1200*600 (3:4) Recommended, Up to 10MB Each
                        </p>
                      </div>
                    </VideoPicker>
                   
                  </div>
                  <VideoPicker
                      className="flex-1"
                      // error={errors.images as string}
                      // value={values.images}
                      resetValue={() => {
                        setFieldValue("video", []);
                      }}
                      // removeImage={(index) => {
                      //   const temp_images: any = values.images;
                      //   temp_images.splice(index, 1);
                      //   setFieldValue("images", temp_images);
                      // }}
                      onChange={(files) => {
                        setFieldTouched("video", true);
                        return uploadVideo(files);
                      }}
                      onSizeError={(error) => {
                        console.log(error);
                      }}
                      touched={true}
                    >
                          <div className="flex   w-1/2">
                        <CustomButton
                          type={"button"}
                          handleButtonClick={(files: any) => {
                            setFieldTouched("video", true);
                            return uploadVideo(files);
                          }}
                          label="Upload Video"
                          styleClass="btn-black !rounded-md"
                        />
                      </div>
                    </VideoPicker>
                    <ErrorMessage
                      name={`video`}
                      component={"span"}
                      className="text-xs text-red-100 pt-1"
                    />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CustomCard>
    </>
  );
};

export default AddShorts;
