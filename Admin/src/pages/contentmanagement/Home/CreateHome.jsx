import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { BASE_URL_ADMIN, CREATE_HOME } from "../../../API";
import { toast } from "react-toastify";

const CreateHome = () => {
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    sliderImages: [], // multiple
    sliderPreviews: [],
  });

  const [partners, setPartners] = useState([]);
  const [partnerPreviews, setPartnerPreviews] = useState([]);

  const [contentHighlights, setContentHighlights] = useState([
    { icon: "", title: "", desc: "" },
  ]);

  const [caseStudies, setCaseStudies] = useState([
    { title: "", category: "", image: null, preview: null },
  ]);

  const [contact, setContact] = useState({
    title: "",
    highlights: [""],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Hero Slider Image Handlers
  const handleHeroSliderChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setHero({
      ...hero,
      sliderImages: [...hero.sliderImages, ...files],
      sliderPreviews: [...hero.sliderPreviews, ...previews],
    });
  };

  const removeHeroImage = (index) => {
    const updated = [...hero.sliderImages];
    const previews = [...hero.sliderPreviews];
    updated.splice(index, 1);
    previews.splice(index, 1);
    setHero({ ...hero, sliderImages: updated, sliderPreviews: previews });
  };

  // 🔹 Partner Logos Handlers
  const handlePartnerAdd = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPartners([...partners, ...files]);
    setPartnerPreviews([...partnerPreviews, ...previews]);
  };

  const removePartnerLogo = (index) => {
    const updated = [...partners];
    const previews = [...partnerPreviews];
    updated.splice(index, 1);
    previews.splice(index, 1);
    setPartners(updated);
    setPartnerPreviews(previews);
  };

  // 🔹 Content Highlights
  const handleContentChange = (index, field, value) => {
    const updated = [...contentHighlights];
    updated[index][field] = value;
    setContentHighlights(updated);
  };

  const addContentHighlight = () =>
    setContentHighlights([
      ...contentHighlights,
      { icon: "", title: "", desc: "" },
    ]);

  const removeContentHighlight = (index) =>
    setContentHighlights(contentHighlights.filter((_, i) => i !== index));

  // 🔹 Case Studies
  const handleCaseChange = (index, field, value) => {
    const updated = [...caseStudies];
    updated[index][field] = value;
    setCaseStudies(updated);
  };

  const handleCaseImage = (index, e) => {
    const file = e.target.files[0];
    const updated = [...caseStudies];
    updated[index].image = file;
    updated[index].preview = file ? URL.createObjectURL(file) : null;
    setCaseStudies(updated);
  };

  const addCaseStudy = () =>
    setCaseStudies([
      ...caseStudies,
      { title: "", category: "", image: null, preview: null },
    ]);

  const removeCaseStudy = (index) =>
    setCaseStudies(caseStudies.filter((_, i) => i !== index));

  // 🔹 Contact
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

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      // Hero
      formData.append("hero[title]", hero.title);
      formData.append("hero[subtitle]", hero.subtitle);
      formData.append("hero[buttonText]", hero.buttonText);
      hero.sliderImages.forEach((img) => formData.append("heroSlider", img));

      // Partners
      partners.forEach((file) => formData.append("partnerLogo", file));

      // Highlights
      formData.append("contentHighlights", JSON.stringify(contentHighlights));

      // Case Studies
      caseStudies.forEach((item, i) => {
        formData.append(`caseStudies[${i}][title]`, item.title);
        formData.append(`caseStudies[${i}][category]`, item.category);
        if (item.image) formData.append(`caseStudies[${i}][image]`, item.image);
      });

      // Contact
      formData.append("contact[title]", contact.title);
      contact.highlights.forEach((h) =>
        formData.append("contact[highlights][]", h)
      );

      await axios.post(`${BASE_URL_ADMIN}${CREATE_HOME}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Home Page Created Successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error creating home page:", error);
      toast.error("Failed to create home page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />

        <div className="col-9 main-dash-left">
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              Home Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Home Page</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white p-4 rounded-4 shadow-sm">
                <h3 className="heading-view-med mb-4 text-primary">
                  Create Home Page
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* HERO SECTION */}
                  <h5 className="mb-3 mt-2 text-decoration-underline">
                    Hero Section
                  </h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Hero Title *</Form.Label>
                    <Form.Control
                      type="text"
                      value={hero.title}
                      onChange={(e) =>
                        setHero({ ...hero, title: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subtitle *</Form.Label>
                    <Form.Control
                      type="text"
                      value={hero.subtitle}
                      onChange={(e) =>
                        setHero({ ...hero, subtitle: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Button Text *</Form.Label>
                    <Form.Control
                      type="text"
                      value={hero.buttonText}
                      onChange={(e) =>
                        setHero({ ...hero, buttonText: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Hero Slider Images (Multiple)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleHeroSliderChange}
                    />
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {hero.sliderPreviews.map((src, i) => (
                        <div key={i} className="position-relative">
                          <img
                            src={src}
                            alt={`Hero ${i + 1}`}
                            className="img-thumbnail rounded-3 shadow-sm"
                            width="180"
                          />
                          <Button
                            size="sm"
                            variant="danger"
                            className="position-absolute top-0 end-0 m-1"
                            onClick={() => removeHeroImage(i)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  {/* PARTNERS */}
                  <h5 className="mb-3 mt-4 text-decoration-underline">
                    Partners (Multiple Logos)
                  </h5>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePartnerAdd}
                  />
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {partnerPreviews.map((src, i) => (
                      <div key={i} className="position-relative">
                        <img
                          src={src}
                          alt={`Partner ${i + 1}`}
                          className="img-thumbnail rounded-3 shadow-sm"
                          width="150"
                        />
                        <Button
                          size="sm"
                          variant="danger"
                          className="position-absolute top-0 end-0 m-1"
                          onClick={() => removePartnerLogo(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* CONTENT HIGHLIGHTS */}
                  <h5 className="mb-3 mt-4 text-decoration-underline">
                    Content Highlights
                  </h5>
                  {contentHighlights.map((item, index) => (
                    <div key={index} className="border p-3 rounded-3 mb-3">
                      <Form.Group className="mb-2">
                        <Form.Label>Icon *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g. 🔥 or icon name"
                          value={item.icon}
                          onChange={(e) =>
                            handleContentChange(index, "icon", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter title"
                          value={item.title}
                          onChange={(e) =>
                            handleContentChange(index, "title", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Enter description"
                          value={item.desc}
                          onChange={(e) =>
                            handleContentChange(index, "desc", e.target.value)
                          }
                        />
                      </Form.Group>

                      {index > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeContentHighlight(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={addContentHighlight}
                  >
                    + Add Content Block
                  </Button>

                  {/* CASE STUDIES */}
                  <h5 className="mb-3 mt-4 text-decoration-underline">
                    Case Studies
                  </h5>
                  {caseStudies.map((item, index) => (
                    <div key={index} className="border p-3 rounded-3 mb-3">
                      <Form.Group className="mb-2">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleCaseChange(index, "title", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Category *</Form.Label>
                        <Form.Control
                          type="text"
                          value={item.category}
                          onChange={(e) =>
                            handleCaseChange(index, "category", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Image *</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCaseImage(index, e)}
                        />
                        {item.preview && (
                          <div className="mt-2 text-center">
                            <img
                              src={item.preview}
                              alt="Preview"
                              className="img-thumbnail rounded-3 shadow-sm"
                              width="200"
                            />
                          </div>
                        )}
                      </Form.Group>

                      {index > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeCaseStudy(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" onClick={addCaseStudy}>
                    + Add Case Study
                  </Button>

                  {/* CONTACT */}
                  <h5 className="mb-3 mt-4 text-decoration-underline">
                    Contact Section
                  </h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Title *</Form.Label>
                    <Form.Control
                      type="text"
                      value={contact.title}
                      onChange={(e) =>
                        setContact({ ...contact, title: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  {contact.highlights.map((highlight, index) => (
                    <div key={index} className="d-flex gap-2 mb-2">
                      <Form.Control
                        type="text"
                        placeholder="Highlight (e.g., Phone, Email)"
                        value={highlight}
                        onChange={(e) =>
                          handleContactHighlight(index, e.target.value)
                        }
                      />
                      {index > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeContactHighlight(index)}
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

                  {/* Submit */}
                  <div className="text-center mt-4">
                    <Button
                      className="px-5 py-2 fw-semibold"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Home Page"}
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

export default CreateHome;
