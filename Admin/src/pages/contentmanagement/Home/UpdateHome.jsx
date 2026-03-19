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

  // 🔹 Fetch Home Data
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL_ADMIN}${GET_HOME}`, {
          headers: { Token: localStorage.getItem("token") },
        });
        const home = res.data?.data;

        if (home) {
          setHero({
            title: home.hero.title,
            subtitle: home.hero.subtitle,
            buttonText: home.hero.buttonText,
            newImages: [],
            previews: [],
            existing: home.hero.sliderImages || [],
          });
          setPartners({
            newFiles: [],
            previews: [],
            existing: home.partners || [],
          });
          setContentHighlights(home.contentHighlights || []);
          setContact(home.contact || { title: "", highlights: [""] });
        }
      } catch (err) {
        toast.error("Failed to load Home Page data.");
      }
    })();
  }, []);

  // 🔹 Delete Image Handler
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

  // 🔹 Hero Image Handlers
  const handleHeroImages = (e) => {
    const files = Array.from(e.target.files);
    setHero((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
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

  // 🔹 Partner Image Handlers
  const handlePartnerLogos = (e) => {
    const files = Array.from(e.target.files);
    setPartners((prev) => ({
      ...prev,
      newFiles: [...prev.newFiles, ...files],
      previews: [...prev.previews, ...files.map((f) => URL.createObjectURL(f))],
    }));
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

  // 🔹 Content Highlights
  const handleHighlightChange = (i, field, value) => {
    const updated = [...contentHighlights];
    updated[i][field] = value;
    setContentHighlights(updated);
  };

  const addHighlight = () =>
    setContentHighlights([
      ...contentHighlights,
      { icon: "", title: "", desc: "" },
    ]);

  const removeHighlight = (i) =>
    setContentHighlights(contentHighlights.filter((_, idx) => i !== idx));

  // 🔹 Contact Section
  const handleContactHighlight = (index, value) => {
    const updated = [...contact.highlights];
    updated[index] = value;
    setContact({ ...contact, highlights: updated });
  };

  const addContactHighlight = () =>
    setContact({ ...contact, highlights: [...contact.highlights, ""] });

  const removeContactHighlight = (index) =>
    setContact({
      ...contact,
      highlights: contact.highlights.filter((_, i) => i !== index),
    });

  // 🔹 Submit Handler
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
        formData.append("contact[highlights][]", h)
      );

      await axios.put(`${BASE_URL_ADMIN}${UPDATE_HOME}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Home Page Updated Successfully!");
      navigate("/update-home");
    } catch (err) {
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

          <section>
            <div className="col-12">
              <div className="comn-back-white p-4 rounded-4 shadow-sm">
                <h3 className="heading-view-med mb-4 text-primary">
                  Update Home Page
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* HERO SECTION */}
                  <h5 className="text-decoration-underline mb-3">
                    Hero Section
                  </h5>
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      value={hero.title}
                      onChange={(e) =>
                        setHero({ ...hero, title: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Subtitle *</Form.Label>
                    <Form.Control
                      value={hero.subtitle}
                      onChange={(e) =>
                        setHero({ ...hero, subtitle: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Button Text *</Form.Label>
                    <Form.Control
                      value={hero.buttonText}
                      onChange={(e) =>
                        setHero({ ...hero, buttonText: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  {/* Hero Images */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Hero Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleHeroImages}
                    />
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {[...hero.existing, ...hero.previews].map((img, i) => {
                        const src =
                          typeof img === "string"
                            ? img
                            : img.image
                            ? `${BASE_URL}/uploads/${img.image}`
                            : img;
                        return (
                          <div key={i} className="position-relative">
                            <img
                              src={src}
                              alt=""
                              className="img-thumbnail"
                              width="160"
                            />
                            <Button
                              size="sm"
                              variant="danger"
                              className="position-absolute top-0 end-0 m-1"
                              onClick={() =>
                                removeHeroImage(
                                  i,
                                  typeof img === "object" ? img : null
                                )
                              }
                            >
                              ×
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </Form.Group>

                  {/* PARTNERS */}
                  <h5 className="text-decoration-underline mt-4 mb-3">
                    Partner Logos
                  </h5>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePartnerLogos}
                  />
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {[...partners.existing, ...partners.previews].map(
                      (img, i) => {
                        const src =
                          typeof img === "string"
                            ? img
                            : img.image
                            ? `${BASE_URL}/uploads/${img.image}`
                            : img;
                        return (
                          <div key={i} className="position-relative">
                            <img
                              src={src}
                              alt=""
                              className="img-thumbnail"
                              width="130"
                            />
                            <Button
                              size="sm"
                              variant="danger"
                              className="position-absolute top-0 end-0 m-1"
                              onClick={() =>
                                removePartnerLogo(
                                  i,
                                  typeof img === "object" ? img : null
                                )
                              }
                            >
                              ×
                            </Button>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* CONTENT HIGHLIGHTS */}
                  <h5 className="text-decoration-underline mt-4 mb-3">
                    Content Highlights
                  </h5>
                  {contentHighlights.map((item, i) => (
                    <div key={i} className="border p-3 rounded-3 mb-3">
                      <Form.Group className="mb-2">
                        <Form.Label>Icon</Form.Label>
                        <Form.Control
                          value={item.icon}
                          onChange={(e) =>
                            handleHighlightChange(i, "icon", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          value={item.title}
                          onChange={(e) =>
                            handleHighlightChange(i, "title", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={item.desc}
                          onChange={(e) =>
                            handleHighlightChange(i, "desc", e.target.value)
                          }
                        />
                      </Form.Group>

                      {i > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeHighlight(i)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" onClick={addHighlight}>
                    + Add Content Block
                  </Button>

                  {/* CONTACT SECTION */}
                  <h5 className="text-decoration-underline mt-4 mb-3">
                    Contact Section
                  </h5>
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Contact Title *</Form.Label>
                    <Form.Control
                      value={contact.title}
                      onChange={(e) =>
                        setContact({ ...contact, title: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  {contact.highlights.map((h, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                      <Form.Control
                        type="text"
                        value={h}
                        onChange={(e) =>
                          handleContactHighlight(i, e.target.value)
                        }
                      />
                      {i > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeContactHighlight(i)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={addContactHighlight}
                  >
                    + Add Highlight
                  </Button>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <Button
                      className="comn-btn-pair"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Home Page"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UpdateHome;
