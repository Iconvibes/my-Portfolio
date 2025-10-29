const ContactHead = () => {
  return (
    <div className="mt-20 lg:mt-0">
        {/* <!-- contact top --> */}
        <h2 class="text-myWhite font-roboto text-center font-semibold tracking-wider leading-9 text-2xl lg:text-4xl">Contact <span>Me</span>.</h2>
          
        <p class="text-gray-200 text-center text-lg lg:w-[70%] lg:mx-auto mt-4 mb-6">
          I am currently open to full time , contract, or part-time oppurtunities in frontend development
        </p>

              {/* <!-- contact details --> */}
            <div class="flex flex-col items-start space-y-4">

               <p class="text-myWhite text-xl w-fit mx-auto underline mb-2">
              Have an awesome project in mind?
              <a href="#" class="text-secondary inline-block">Let's Discuss</a>
            </p>

              {/* <!-- email --> */}
               <div class="flex justify-center gap-2.5 items-center ml-3.5 lg:ml-16 ">
                <i class="fa-solid fa-envelope mr-2 social-links inline-block"></i>
                <p class="text-gray-300 mb-2 inline-block"> ferdinardoluwajuwonlo@gmail.com</p>
               </div>
              {/* <!-- phone --> */}
               <div class="flex justify-center justify-between gap-2.5 items-center ml-3.5 lg:ml-16">
                <i class="fa-solid fa-phone mr-2 social-links inline-block"></i>
                <p class="text-gray-300 mb-2 inline-block"> +2349137360986</p>
               </div>
              {/* <!-- address --> */}
               <div class="flex justify-center gap-2.5 items-center ml-3.5 lg:ml-16">
                <i class="fa-solid fa-location-dot mr-2 social-links inline-block"></i>
                <p class="text-gray-300 mb-2 inline-block"> Lagos, Nigeria</p>
               </div>
            </div>
    </div>
  )
}

export default ContactHead