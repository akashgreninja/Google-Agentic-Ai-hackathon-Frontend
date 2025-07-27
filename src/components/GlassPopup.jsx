import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useApi } from '../helpers/api';

export default function GlassPopup({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;
  const [liked, setLiked] = useState(null);
  const { icon: Icon, title, summary, timestamp, severity, category } = data;
  const { callApi } = useApi();
  const handleLike = (like) => {
    setLiked(like);
    // callApi(`data/update_interests`, {
    //   method: 'POST',
    //   body: {
    //     category,
    //     user_id: 'john.doe@example.com',
    //     action: like ? 'add' : 'remove',
    //   },
    // });
  };
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 text-white"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          {Icon && <Icon className="text-white" size={32} />}
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2">
            <LikeFilled
              size={24}
              style={{ color: liked ? '#3b82f6' : '#fff' }}
              onClick={() => handleLike(!liked)}
            />
          </div>
        </div>

        <p className="text-white/90 leading-relaxed mb-4">{summary}</p>

        <div className="grid grid-cols-2 gap-4 text-white/80 text-sm">
          <div>
            <span className="font-medium">Severity:</span> {severity}
          </div>
          <div>
            <span className="font-medium">Time:</span> {new Date(timestamp).toLocaleString()}
          </div>
          {/* Add more fields here if needed */}
        </div>
      </motion.div>
    </motion.div>
  );
}
