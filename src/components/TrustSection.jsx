import React from 'react'

const TrustSection = () => {
  return (
    <section className="bg-white py-12 border-t border-[rgba(94,82,64,0.12)]">
      <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'32px'}}>
          <div>
            <h3 className="text-[#13323b] text-[20px] mb-4 font-semibold">How We Help Families</h3>
            <p className="text-[#62708d] leading-[1.6] mb-4">We provide independent hospice guidance and connect families with quality agencies at no cost. Our licensed professionals help you understand options, navigate Medicare, and make informed decisions.</p>
          </div>
          <div>
            <h3 className="text-[#13323b] text-[20px] mb-4 font-semibold">Our Promise to You</h3>
            <ul className="list-none p-0 m-0">
              {['No cost to families','Independent, unbiased guidance','HIPAA-compliant privacy protection','Licensed healthcare professionals only','24/7 crisis support available'].map((item) => (
                <li key={item} className="relative pl-6 mb-2 text-[#62708d] leading-[1.5]">
                  <span className="absolute left-0 text-[#22c55e] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#13323b] text-[20px] mb-4 font-semibold">How We're Supported</h3>
            <p className="text-[#62708d] leading-[1.6] mb-4">Family Hospice Support Network is supported by participating hospice agencies who value our pre-qualification and family education services. This allows us to provide free guidance to families.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
