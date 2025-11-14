import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { UserInputs, ImamRecommendation } from '../types';
import { OCCASIONS, GENDERS, AGE_RANGES, BODY_TYPES, SKIN_TONES, BUDGETS } from '../constants';
import { getRecommendation } from '../services/apiService';

interface InputPanelProps {
  onNewRecommendation: (response: ImamRecommendation, inputs: UserInputs, image: string | null) => void;
  setLoading: (loading: boolean) => void;
  onStartOver: () => void;
  hasResult: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onNewRecommendation, setLoading, onStartOver, hasResult }) => {
  const [inputs, setInputs] = useState<UserInputs>({
    occasion: 'Casual',
    gender: 'Female',
    ageRange: '26-35',
    bodyType: 'Average',
    skinTone: 'Medium',
    budget: 'Medium',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] ?? null);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getRecommendation(inputs, imageFile);
      onNewRecommendation(response, inputs, imagePreview);
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      alert(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const Label: React.FC<{htmlFor: string; children: React.ReactNode}> = ({htmlFor, children}) => (
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-300 mb-2">{children}</label>
  );

  const Select: React.FC<{name: string, value: string, onChange: (e: ChangeEvent<HTMLSelectElement>) => void, options: string[]}> = ({name, value, onChange, options}) => (
      <select name={name} value={value} onChange={onChange} className="w-full bg-[#1c1c1c] border border-gray-600 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition">
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
  );

  return (
    <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg sticky top-24">
      <h2 className="text-2xl font-bold text-[#d4af37] mb-6">Create Your Look</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <Label htmlFor="photo">Upload Your Photo</Label>
            <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-xl cursor-pointer hover:border-[#d4af37] transition-colors ${isDragging ? 'border-[#d4af37] bg-gray-800' : ''} ${imagePreview ? 'p-0 border-solid' : ''}`}
            >
                {imagePreview ? (
                    <img src={imagePreview} alt="User upload preview" className="imam-image"/>
                ) : (
                  <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm text-gray-400">Drag & Drop or Click to Upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
            </div>
            <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>
        <div>
          <Label htmlFor="occasion">Occasion</Label>
          <Select name="occasion" value={inputs.occasion} onChange={handleChange} options={OCCASIONS} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" value={inputs.gender} onChange={handleChange} options={GENDERS} />
            </div>
            <div>
              <Label htmlFor="ageRange">Age Range</Label>
              <Select name="ageRange" value={inputs.ageRange} onChange={handleChange} options={AGE_RANGES} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="bodyType">Body Type</Label>
                <Select name="bodyType" value={inputs.bodyType} onChange={handleChange} options={BODY_TYPES} />
            </div>
            <div>
                <Label htmlFor="skinTone">Skin Tone</Label>
                <Select name="skinTone" value={inputs.skinTone} onChange={handleChange} options={SKIN_TONES} />
            </div>
        </div>
        <div>
            <Label htmlFor="budget">Budget</Label>
            <Select name="budget" value={inputs.budget} onChange={handleChange} options={BUDGETS} />
        </div>
        <div className="pt-4">
             {hasResult ? (
                 <button type="button" onClick={onStartOver} className="w-full flex justify-center py-3 px-4 rounded-xl text-lg font-bold text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] transition-all">
                    New Look
                 </button>
             ) : (
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-yellow-500/10 text-lg font-bold text-[#0b0b0b] bg-[#d4af37] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] transition-all transform hover:scale-105">
                    Get My Style
                </button>
             )}
        </div>
      </form>
    </div>
  );
};

export default InputPanel;