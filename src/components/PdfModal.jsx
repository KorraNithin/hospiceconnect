import React from 'react'

const PdfModal = ({ src, title, onClose }) => {
  if (!src) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_10px_10px_-5px_rgba(0,0,0,0.04)] w-[95%] h-[90vh] max-w-[900px] overflow-hidden z-[1001]">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-[rgba(94,82,64,0.12)] text-[#13323b] hover:bg-[rgba(94,82,64,0.2)] flex items-center justify-center border-0 cursor-pointer"
        >
          ×
        </button>
        {title && (
          <div className="px-4 pt-4 pb-2 border-b border-[rgba(94,82,64,0.12)]">
            <h3 className="m-0 text-[16px] text-[#13323b]">{title}</h3>
          </div>
        )}
        <iframe
          title={title || 'Document'}
          src={src}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  )
}

export default PdfModal



