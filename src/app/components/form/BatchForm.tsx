"use client";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ModelOptions, LicenseLevelOptions } from "./constants";

interface FormValues {
  model: string;
  licenseLevel: number | string;
  quantity: number | string;
  date: string;
  comment: string;
}

const BatchForm: React.FC = () => {
  const initialValues: FormValues = {
    model: "",
    licenseLevel: "",
    quantity: "",
    date: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    model: Yup.string().required("Model is required"),
    licenseLevel: Yup.number().required("License Level is required"),
    quantity: Yup.number().required("Quantity is required"),
    date: Yup.string().required("Date is required"),
    comment: Yup.string(),
  });

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: any }
  ) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Batch added successfully");
        alert("Batch added successfully");
        resetForm();
      } else {
        console.error("Failed to add batch");
        alert("Failed to add batch");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div className="text-black p-8 rounded-md shadow-md border-2 border-[#6e5634]">
            <h3 className="text-[18px] mt-2 font-bold text-white mb-4">
              Batch Form
            </h3>
            <Field
              as="select"
              id="dropdown"
              name="model"
              type="text"
              className="px-6 py-2 w-full mb-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
            >
              <option value="" label="Model" />
              {ModelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="model"
              component="div"
              className="text-red-500 w-full text-sm mb-2"
            />

            <Field
              name="date"
              as="input"
              type="date"
              className="px-6 py-2  w-full mb-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-500 w-full text-sm mb-2"
            />

            <Field
              type="text"
              name="quantity"
              placeholder="Quantity"
              className="px-6 py-2 w-full mb-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500 w-full text-sm mb-2"
            />

            <Field
              as="select"
              id="dropdown"
              name="licenseLevel"
              type="text"
              className="px-6 py-2 w-full mb-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" label="License Level" />
              {LicenseLevelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="dropdown"
              component="div"
              className="text-red-500 w-full text-sm mb-2"
            />

            <Field
              type="text"
              name="comment"
              placeholder="Comments"
              className="px-6 py-2 w-full mb-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-red-500 w-full text-sm mb-2"
            />

            <button
              type="submit"
              className="bg-[#6e5634] px-2 py-2 w-full my-2 rounded-md text-white"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BatchForm;
