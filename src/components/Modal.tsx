import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { UserObjectType, updateUserState } from "../app/slices/userSlice";
import Loader from "../assets/loader.svg";
import UploadImage from "../assets/upload.svg";
import { useClickOutside } from "../hooks/useClickOutside";

type ModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  userState: UserObjectType;
};

export default function Modal({ modal, setModal, userState }: ModalProps) {
  const dispatch = useAppDispatch();
  const [imageLink, setImageLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function uploadTheImage(base64EncodedImage: any) {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/image/upload`,
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(
        updateUserState({
          ...userState,
          user: {
            ...userState.user,
            picture: response.data.image_url,
          },
        })
      );
      setIsLoading(false);
      setModal(false);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      uploadTheImage(reader.result);
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const modalRef = useClickOutside(() => {
    setModal(false);
  });

  return (
    <>
      <div
        id="image_upload_modal_overlay"
        className={`absolute top-0 left-0 right-0 bottom-0 h-screen bg-[#0000004d] flex gap-3 items-start justify-center ${
          !modal ? "hidden" : ""
        }`}
      >
        <main
          id="main_container"
          ref={modalRef}
          className="flex flex-col w-11/12 md:w-8/12 lg:w-6/12 xl:w-3/12 gap-2 mt-7"
        >
          <div
            id="modal"
            {...getRootProps({
              className: "h-80 bg-white p-7 rounded-lg cursor-pointer",
            })}
          >
            <input {...getInputProps()} />
            <div
              className={`flex flex-col gap-3 items-center justify-center border-[1px] border-[#2F80ED] ${
                isDragActive ? "border-[3px]" : ""
              } h-full rounded-lg`}
            >
              {isLoading ? (
                <img src={Loader} alt="Loading...." className="h-1/3" />
              ) : (
                <>
                  <img
                    src={UploadImage}
                    alt="Upload Image"
                    className="h-16 invert-[30%] sepia-[3%] saturate-[10%] hue-rotate-[350deg] brightness-[96%] contrast-[92%]"
                    loading="lazy"
                  />
                  <h1 className="font-primary text-[#828282]">
                    Choose or Drag & Drop files OR
                  </h1>
                </>
              )}
            </div>
          </div>

          <div
            id="link_box_container"
            className="bg-white p-7 rounded-lg flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Enter Image Link..."
              className="border-[1px] border-[#828282] text-sm py-2 px-4 rounded-lg font-primary outline-none"
              value={imageLink}
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
            />
            <button
              className="bg-[#2F80ED] text-white text-sm font-primary font-[600] py-2 px-4 rounded-lg"
              onClick={() => {
                dispatch(
                  updateUserState({
                    ...userState,
                    user: {
                      ...userState.user,
                      picture: imageLink,
                    },
                  })
                );
                setModal(false);
              }}
            >
              Add Image
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
