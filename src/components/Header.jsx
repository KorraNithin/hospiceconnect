import React from 'react'

const Header = () => {
  const handleLoginClick = () => {
    window.open('http://localhost:5502', '_blank')
  }

  return (
    <header className="bg-white border-b border-[rgba(94,82,64,0.12)] py-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex justify-between items-start gap-8">
          <div>
            <h1 className="text-[#2185a1] text-[24px] font-semibold mb-1 leading-[1.2]">hospiceconnectdallas</h1>
            <p className="text-[#62708d] text-[12px] m-0 font-medium">Connecting Dallas Families with Quality Hospice Care</p>
          </div>
          <div className="text-right">
            <div className="flex gap-3 mb-4 flex-wrap justify-end">
              <span className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-3 py-1 rounded-full text-[11px] font-[550] border border-[rgba(34,197,94,0.3)] whitespace-nowrap">HIPAA Secure</span>
              <span className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-3 py-1 rounded-full text-[11px] font-[550] border border-[rgba(34,197,94,0.3)] whitespace-nowrap">We Care For You</span>
              <button
                className="bg-[#1fb8cd] text-[#1a232b] border-2 border-[#14532d] font-semibold text-[11px] tracking-[0.03em] shadow-[0_2px_8px_rgba(31,184,205,0.18)] transition-[background,box-shadow,border,color] duration-200 outline-none cursor-pointer px-3 py-1 rounded-full hover:bg-[#14532d] hover:text-white hover:border-[#1fb8cd] hover:shadow-[0_4px_16px_rgba(31,184,205,0.28)]"
                onClick={handleLoginClick}
                type="button"
              >
                Local Healthcare Professional Login
              </button>
            </div>
            <div>
              <div className="mb-2">
                <span className="text-[#62708d] text-[12px] font-medium">24/7 Support:</span>
                <a href="tel:+12145552273" className="text-[#2185a1] text-[18px] font-semibold no-underline ml-2 hover:text-[#1a6b7d]">(214) 555-CARE (2273)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
