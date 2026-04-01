import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { products as initialProducts } from "../lib/mock-data.js";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, Mic, Video, Edit, LogOut, Upload, X, Square, Image, Check, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [myProducts, setMyProducts] = useState(initialProducts.slice(0, 3));

  // Form state
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile({ file, name: file.name, preview: URL.createObjectURL(file) });
    }
  };

  const removeVideo = () => {
    if (videoFile) URL.revokeObjectURL(videoFile.preview);
    setVideoFile(null);
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        // In a real app, you'd send the audio to a speech-to-text API
        // For now, we simulate a transcript
        setVoiceTranscript("Voice description recorded successfully. (Voice-to-text would process here)");
        setDescription((prev) => prev ? prev + " " + "Voice description recorded." : "Voice description recorded.");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Could not access microphone. Please allow microphone permission.");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim() || !price) return;

    const newProduct = {
      id: "p" + Date.now(),
      name: productName,
      description: description || "No description provided",
      price: Number(price),
      category: "textiles",
      image: photos.length > 0 ? photos[0].preview : initialProducts[0].image,
      manufacturerId: "m1",
      manufacturerName: "Lakshmi SHG",
      photos: photos.map((p) => p.preview),
    };

    setMyProducts((prev) => [newProduct, ...prev]);
    resetForm();
  };

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(String(product.price));
  };

  const saveEdit = (id) => {
    if (!editName.trim() || !editPrice) return;
    setMyProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, name: editName, price: Number(editPrice) } : p)
    );
    setEditingId(null);
  };

  const deleteProduct = (id) => {
    setMyProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setPhotos([]);
    setVideoFile(null);
    setVoiceTranscript("");
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="dashboard-header-row">
            <div>
              <h1 className="dashboard-title">Manufacturer Dashboard 🏭</h1>
              <p className="dashboard-subtitle">Manage your products and craft stories</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus style={{ height: '1rem', width: '1rem' }} /> Add Product
              </button>
              <button className="btn btn-outline btn-logout" onClick={() => navigate("/")}>
                <LogOut style={{ height: '1rem', width: '1rem' }} /> Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="stats-grid">
          {[
            { icon: Package, label: "Products", value: String(myProducts.length) },
            { icon: Video, label: "Videos", value: "2" },
            { icon: Edit, label: "Pending", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <stat.icon className="stat-icon" />
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="add-form">
              <h2 className="add-form-title">Add New Product</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="add-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="productName">Product Name *</label>
                    <input className="form-input" id="productName" placeholder="e.g. Hand-woven Silk Scarf" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="price">Price (₹) *</label>
                    <input className="form-input" id="price" type="number" placeholder="500" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea className="form-textarea" id="description" placeholder="Describe your product..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Or describe using voice</label>
                  {!isRecording ? (
                    <button type="button" className="btn btn-outline btn-full" style={{ marginTop: '0.25rem' }} onClick={startVoiceRecording}>
                      <Mic style={{ height: '1rem', width: '1rem', color: 'hsl(var(--primary))' }} /> Record Voice Description
                    </button>
                  ) : (
                    <button type="button" className="btn btn-outline btn-full recording-btn" style={{ marginTop: '0.25rem' }} onClick={stopVoiceRecording}>
                      <Square style={{ height: '1rem', width: '1rem', color: 'hsl(var(--destructive))' }} /> Stop Recording...
                    </button>
                  )}
                  {voiceTranscript && (
                    <p className="voice-transcript">{voiceTranscript}</p>
                  )}
                </div>

                <div className="add-form-grid">
                  <div className="form-group">
                    <label className="form-label">Product Photos</label>
                    <input type="file" accept="image/*" multiple ref={photoInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    <div className="upload-area" onClick={() => photoInputRef.current?.click()}>
                      <Image style={{ height: '1.5rem', width: '1.5rem', color: 'hsl(var(--muted-foreground))' }} />
                      <p className="upload-text">Click to upload photos</p>
                    </div>
                    {photos.length > 0 && (
                      <div className="uploaded-files">
                        {photos.map((photo, i) => (
                          <div key={i} className="uploaded-file">
                            <img src={photo.preview} alt={photo.name} className="uploaded-file-preview" />
                            <span className="uploaded-file-name">{photo.name}</span>
                            <button type="button" className="btn btn-ghost btn-sm" onClick={() => removePhoto(i)}>
                              <X style={{ height: '0.75rem', width: '0.75rem' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Craft-Making Video</label>
                    <input type="file" accept="video/*" ref={videoInputRef} style={{ display: 'none' }} onChange={handleVideoUpload} />
                    <div className="upload-area" onClick={() => videoInputRef.current?.click()}>
                      <Video style={{ height: '1.5rem', width: '1.5rem', color: 'hsl(var(--muted-foreground))' }} />
                      <p className="upload-text">Click to upload video</p>
                    </div>
                    {videoFile && (
                      <div className="uploaded-files">
                        <div className="uploaded-file">
                          <Video style={{ height: '1rem', width: '1rem', color: 'hsl(var(--primary))' }} />
                          <span className="uploaded-file-name">{videoFile.name}</span>
                          <button type="button" className="btn btn-ghost btn-sm" onClick={removeVideo}>
                            <X style={{ height: '0.75rem', width: '0.75rem' }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">Save Product</button>
                  <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="section-title mt-10">Your Products</h2>
        <div className="mt-4">
          {myProducts.map((p) => (
            <div key={p.id} className="product-list-item">
              <img src={p.image} alt={p.name} className="product-list-img" />
              {editingId === p.id ? (
                <div className="product-list-info product-edit-fields">
                  <input className="form-input form-input-sm" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Product name" />
                  <input className="form-input form-input-sm" type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Price" />
                </div>
              ) : (
                <div className="product-list-info">
                  <h3 className="product-list-name">{p.name}</h3>
                  <p className="product-list-meta">{p.category} · ₹{p.price.toLocaleString("en-IN")}</p>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {editingId === p.id ? (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={() => saveEdit(p.id)}>
                      <Check style={{ height: '0.75rem', width: '0.75rem' }} /> Save
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline btn-sm" onClick={() => startEdit(p)}>
                      <Edit style={{ height: '0.75rem', width: '0.75rem' }} /> Edit
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => deleteProduct(p.id)}>
                      <Trash2 style={{ height: '0.75rem', width: '0.75rem', color: 'hsl(var(--destructive))' }} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManufacturerDashboard;
