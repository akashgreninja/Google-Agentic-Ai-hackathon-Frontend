import React from 'react';
import { useApi } from '../../helpers/api';
import storage from '../../helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const UploadIcon = (props) => (
  <svg {...props}>
    <circle cx="16" cy="16" r="16" fill="#888" />
  </svg>
);
const FileText = ({ file }) => (
  <span style={{ display: 'inline-block', width: '24px', height: '24px' }}>
    <img
      src={URL.createObjectURL(file)}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      fill="#ccc"
    />
  </span>
);
const X = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f00"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

export const Upload = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const showNotification = (type, message) => {
    api[type]({
      message: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      placement: 'top',
      duration: 3,
    });
  };
  const { callApi, loading } = useApi();
  const nav = useNavigate();
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
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
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const openFileDialog = () => fileInputRef.current.click();

  const removeFile = () => setSelectedFile(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedFile) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      try {
        const storageRef = ref(storage, `uploads/${selectedFile.name}_${Date.now()}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        await callApi({
          url: `data/incident/report`,
          method: 'POST',
          body: {
            lat,
            lng,
            area: 'HSR Layout',
            image_url: downloadURL,
          },
        });
        nav('/'); // Redirect to dashboard after upload
      } catch (error) {
        console.error(error);
        showNotification('error', 'Failed to upload file. Please try again.');
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-upload-bg to-secondary p-8"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
    >
      {contextHolder}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">File Upload</h1>
          <p className="text-lg text-upload-text">Upload a single file securely</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-upload-border p-8 mb-8">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
              ${
                isDragOver
                  ? 'border-primary bg-upload-active scale-[1.02]'
                  : 'border-upload-border bg-upload-bg hover:bg-upload-hover hover:border-primary'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
            style={{ cursor: 'pointer' }}
          >
            <input
              ref={fileInputRef}
              type="file"
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
                  Drop a file here or click to browse
                </h3>
                <p className="text-upload-text">Only one file. Max size: 50MB</p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">Selected File</h4>
              <div className="flex items-center justify-between p-4 bg-upload-bg rounded-lg border border-upload-border">
                <div className="flex items-center space-x-3">
                  <FileText file={selectedFile} className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-upload-text">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={removeFile}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            style={{ color: 'white' }}
            size="lg"
            className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!selectedFile || loading}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </div>
    </div>
  );
};
