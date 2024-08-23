import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { CreateEventFormModel } from "../models/formikModels";
import { createEventValidationSchema } from "../validators/formikValidators";
import { FormErrorLabel } from "../widgets/FormErrorLabel";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#D3D3D3",
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");
interface MyModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const CreateEventModal: React.FC<MyModalProps> = ({ isOpen, closeModal }) => {
  const initialValues: CreateEventFormModel = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    participants: "",
  };
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
  } = useFormik<CreateEventFormModel>({
    initialValues: initialValues,
    validationSchema: createEventValidationSchema,
    onSubmit: (values) => {
      console.log("got values", values);
    },
  });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnEsc={true}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl">Create New Event</h1>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="title">
              Title
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="text"
              name="title"
              placeholder="Event title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <FormErrorLabel show={touched.title} errorText={errors.title} />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="description">
              Description
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="text"
              name="desciption"
              placeholder="Event Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <FormErrorLabel
              show={touched.description}
              errorText={errors.description}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="start">
              Starts at:
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="datetime-local"
              name="start"
              placeholder="Event starts at"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startDate}
            />
            <FormErrorLabel
              show={touched.startDate}
              errorText={errors.startDate}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="end">
              Ends at:
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="datetime-local"
              name="end"
              placeholder="Ends at:"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endDate}
            />
            <FormErrorLabel show={touched.endDate} errorText={errors.endDate} />
          </div>
          <div className="text-center">

          <button
            type="submit"
            className="bg-green-400 text-white font-bold py-2 px-4 rounded-full self-center"
            >
            Create
          </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
