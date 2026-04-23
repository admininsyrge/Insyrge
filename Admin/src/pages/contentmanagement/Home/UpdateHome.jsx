import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, BASE_URL_ADMIN, GET_HOME, UPDATE_HOME } from "../../../API";

const UpdateHome = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    newImages: [],
    previews: [],
    existing: [],
  });

  const [partners, setPartners] = useState({
    newFiles: [],
    previews: [],
    existing: [],
  });

  const [contentHighlights, setContentHighlights] = useState([
    { icon: "", title: "", desc: "" },
  ]);

  const [contact, setContact] = useState({
    title: "",
    highlights: [""],
  });

  // ==========================
  // 🔹 Fetch Data (Sanitized)
  // ==========================
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL_ADMIN}${GET_HOME}`, {
          headers: { Token: localStorage.getItem("token") },
        });

        const home = res.data?.data;

        if (home) {
          setHero({
            title: home.hero?.title || "",
            subtitle: home.hero?.subtitle || "",
            buttonText: home.hero?.buttonText || "",
            newImages: [],
            previews: [],
            existing: (home.hero?.sliderImages || []).filter(Boolean),
          });

          setPartners({
            newFiles: [],
            previews: [],
            existing: (home.partners || []).filter(Boolean),
          });

          setContentHighlights(home.contentHighlights || []);
          setContact(home.contact || { title: "", highlights: [""] });
        }
      } catch (err) {
        toast.error("Failed to load Home Page data.");
      }
    })();
  }, []);

  // ==========================
  // 🔹 Delete Image
  // ==========================
  const deleteExistingImage = async (section, imagePath) => {
    try {
      await axios.delete(`${BASE_URL_ADMIN}/home/delete-image`, {
        data: { section, imagePath },
        headers: { Token: localStorage.getItem("token") },
      });
      toast.success("Image deleted successfully!");
    } catch {
      toast.error("Failed to delete image.");
    }
  };

  // ==========================
  // 🔹 Image Handlers
  // ==========================
  const handleHeroImages = (e) => {
    const files = Array.from(e.target.files);
    setHero((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
      previews: [...prev.previews, ...files.map((f) => URL.createObjectURL(f))],
    }));
  };

  const handlePartnerLogos = (e) => {
    const files = Array.from(e.target.files);
    setPartners((prev) => ({
      ...prev,
      newFiles: [...prev.newFiles, ...files],
      previews: [...prev.previews, ...files.map((f) => URL.createObjectURL(f))],
    }));
  };

  const removeHeroImage = (index, existing) => {
    if (existing) {
      deleteExistingImage("hero", existing.image);
      setHero((prev) => ({
        ...prev,
        existing: prev.existing.filter((_, i) => i !== index),
      }));
    } else {
      setHero((prev) => ({
        ...prev,
        newImages: prev.newImages.filter((_, i) => i !== index),
        previews: prev.previews.filter((_, i) => i !== index),
      }));
    }
  };

  const removePartnerLogo = (index, existing) => {
    if (existing) {
      deleteExistingImage("partners", existing.image);
      setPartners((prev) => ({
        ...prev,
        existing: prev.existing.filter((_, i) => i !== index),
      }));
    } else {
      setPartners((prev) => ({
        ...prev,
        newFiles: prev.newFiles.filter((_, i) => i !== index),
        previews: prev.previews.filter((_, i) => i !== index),
      }));
    }
  };

  // ==========================
  // 🔹 Helpers (SAFE IMAGE SRC)
  // ==========================
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (img?.image) return `${BASE_URL}/uploads/${img.image}`;
    return "";
  };

  const isExistingImage = (img) => {
    return img && typeof img === "object" && img.image;
  };

  // ==========================
  // 🔹 Submit
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("hero[title]", hero.title);
      formData.append("hero[subtitle]", hero.subtitle);
      formData.append("hero[buttonText]", hero.buttonText);

      hero.newImages.forEach((file) => formData.append("heroSlider", file));

      partners.newFiles.forEach((file) => formData.append("partnerLogo", file));

      formData.append("contentHighlights", JSON.stringify(contentHighlights));

      formData.append("contact[title]", contact.title);
      contact.highlights.forEach((h) =>
        formData.append("contact[highlights][]", h),
      );

      await axios.put(`${BASE_URL_ADMIN}${UPDATE_HOME}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Home Page Updated Successfully!");
      navigate("/update-home");
    } catch {
      toast.error("Failed to update Home Page!");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // 🔹 UI
  // ==========================
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />

        <div className="col-9 main-dash-left">
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projects" }}>
              Side Bar
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Update Home Page</Breadcrumb.Item>
          </Breadcrumb>

          <div className="comn-back-white p-4 rounded-4 shadow-sm">
            <h3 className="mb-4 text-primary">Update Home Page</h3>

            <form onSubmit={handleSubmit}>
              {/* HERO */}
              <h5>Hero Section</h5>

              <Form.Control
                value={hero.title}
                placeholder="Title"
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />

              <Form.Control
                className="mt-2"
                value={hero.subtitle}
                placeholder="Subtitle"
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              />

              <Form.Control
                className="mt-2"
                value={hero.buttonText}
                placeholder="Button Text"
                onChange={(e) =>
                  setHero({ ...hero, buttonText: e.target.value })
                }
              />

              <Form.Control
                type="file"
                multiple
                className="mt-2"
                onChange={handleHeroImages}
              />

              <div className="d-flex gap-3 mt-3 flex-wrap">
                {[...hero.existing, ...hero.previews]
                  .filter(Boolean)
                  .map((img, i) => (
                    <div key={i} className="position-relative">
                      <img
                        src={getImageSrc(img)}
                        width="150"
                        alt=""
                        className="img-thumbnail"
                      />
                      <Button
                        size="sm"
                        variant="danger"
                        className="position-absolute top-0 end-0"
                        onClick={() =>
                          removeHeroImage(i, isExistingImage(img) ? img : null)
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ))}
              </div>

              {/* PARTNERS */}
              <h5 className="mt-4">Partners</h5>

              <Form.Control
                type="file"
                multiple
                onChange={handlePartnerLogos}
              />

              <div className="d-flex gap-3 mt-3 flex-wrap">
                {[...partners.existing, ...partners.previews]
                  .filter(Boolean)
                  .map((img, i) => (
                    <div key={i} className="position-relative">
                      <img
                        src={getImageSrc(img)}
                        width="120"
                        alt=""
                        className="img-thumbnail"
                      />
                      <Button
                        size="sm"
                        variant="danger"
                        className="position-absolute top-0 end-0"
                        onClick={() =>
                          removePartnerLogo(
                            i,
                            isExistingImage(img) ? img : null,
                          )
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ))}
              </div>

              <div className="text-center mt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHome;
