import React, { useEffect, useState } from "react";
import api from "../../requests/axiosConfig/api";
import CircularLoader from "../CircularLoader";
import toast from "react-hot-toast";

export const ProfileSection: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { firstName: "", lastName: "", phone: "" };

    Object.keys(formData).forEach((key) => {
      if (
        key !== "profileImage" &&
        !formData[key as keyof typeof formData].trim()
      ) {
        newErrors[key as keyof typeof newErrors] = "This field is required";
        valid = false;
      }
    });

    setErrors(newErrors);

    if (valid) {
      try {
        await api.patch("/auth/profile", formData, {
          withCredentials: true,
        });
        toast.success("Update profile Successfully");
        fetchUser();
      } catch (error) {
        // @ts-expect-error
        toast.error(error.response.data.message || "something went wrong...");

        console.log(error);
      } finally {
      }
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/profile", {
        withCredentials: true,
      });
      console.log(response.data.profile);
      const { firstName, lastName, phone, profileImage } =
        response.data.profile;
      setFormData({ firstName, lastName, phone, profileImage });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularLoader />;
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(formData).map(
          (field) =>
            field !== "profileImage" && (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "phone" ? "tel" : "text"}
                  name={field}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 ${
                    errors[field as keyof typeof errors] ? "border-red-500" : ""
                  }`}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                />
                {errors[field as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    {errors[field as keyof typeof errors]}
                  </p>
                )}
              </div>
            )
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            onChange={handleChange}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
