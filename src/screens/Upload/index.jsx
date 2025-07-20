import React from "react";
import { useApi } from "../../helpers/api";
import storage from "../../helpers/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Dummy icons/components for illustration. Replace with your actual imports.
const UploadIcon = (props) => (
  <svg {...props}>
    <circle cx="16" cy="16" r="16" fill="#888" />
  </svg>
);
const FileText = (props) => (
  <svg {...props}>
    <rect width="24" height="24" fill="#ccc" />
  </svg>
);
const X = (props) => (
  <svg {...props}>
    <line x1="4" y1="4" x2="20" y2="20" stroke="#f00" />
    <line x1="20" y1="4" x2="4" y2="20" stroke="#f00" />
  </svg>
);
const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const Upload = () => {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const { callApi, loading } = useApi();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (selectedFiles.length === 0) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      try {
        for (const file of selectedFiles) {
          const storageRef = ref(storage, `uploads/${file.name}_${Date.now()}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          await callApi({
            url: `data/incident/report`,
            method: "POST",
            body: {
              lat,
              lng,
              area: "HSR Layout",
              image_url: downloadURL,
            },
          });
        }
        setSelectedFiles([]);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-upload-bg to-secondary p-8">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            File Upload
          </h1>
          <p className="text-lg text-upload-text">
            Select your files and upload them securely
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-card rounded-2xl shadow-lg border border-upload-border p-8 mb-8">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
              ${
                isDragOver
                  ? "border-primary bg-upload-active scale-[1.02]"
                  : "border-upload-border bg-upload-bg hover:bg-upload-hover hover:border-primary"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
            style={{ cursor: "pointer" }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
            />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-upload-text">
                  Support for multiple files. Maximum file size: 50MB
                </p>
              </div>
            </div>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-upload-bg rounded-lg border border-upload-border"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          {file.name}
                        </p>
                        <p className="text-sm text-upload-text">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={selectedFiles.length === 0 || loading}
          >
            {loading ? "Uploading..." : "Upload Files"}
            {selectedFiles.length > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary-foreground/20 rounded-full text-sm">
                {selectedFiles.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
